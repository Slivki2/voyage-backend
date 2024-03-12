import { DeleteObjectCommand, DeleteObjectOutput, S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { EnvironmentConfig } from "../../config/env/env-configuration"
import { FileDeleteResult, FileUploadResult, PutObjectCommandOutputExtended } from "./types"
import {
  generateS3ObjectKeyFromFilename,
  getS3ObjectKeyFromUrl,
  toFileDeleteErrorResult,
  toFileDeleteSuccessResult,
  toFileUploadErrorResult,
  toFileUploadSuccessResult,
} from "./utils"

@Injectable()
export class AwsS3Service {
  private readonly s3Client = new S3Client({
    region: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").region,
    credentials: {
      accessKeyId: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").accessKeyId,
      secretAccessKey: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").secretAccessKey,
    },
  })

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<FileUploadResult[]> {
    const fileUploadPromises = files.map(file => {
      return this.uploadFileToS3(file)
    })

    try {
      this.logger.log(`Uploading batch (${files.length}) of files to S3`)
      const s3UploadResults = await Promise.allSettled(fileUploadPromises)
      this.logger.log("Files have been uploaded to S3")

      const results = s3UploadResults.map(result => {
        if (result.status === "fulfilled") {
          return toFileUploadSuccessResult(result.value)
        } else {
          this.logger.error("Error while uploading files to S3", result.reason)
          return toFileUploadErrorResult()
        }
      })

      return results
    } catch (error) {
      this.logger.error("Error while uploading files to S3", error)

      return Promise.reject(error)
    }
  }

  async deleteFiles(urls: string[]): Promise<FileDeleteResult[]> {
    const fileDeletePromises = urls.map(url => {
      return this.deleteFileFromS3(url)
    })

    try {
      this.logger.log(`Deleting batch (${urls.length}) of files from S3`)
      const s3DeleteResults = await Promise.allSettled(fileDeletePromises)
      this.logger.log("Files have been deleted from S3")

      const results = s3DeleteResults.map(deleteResult => {
        if (deleteResult.status === "fulfilled") {
          return toFileDeleteSuccessResult(deleteResult.value)
        } else {
          return toFileDeleteErrorResult()
        }
      })

      return results
    } catch (error) {
      this.logger.error("Error while deleting files from S3", error)

      return Promise.reject(error)
    }
  }

  private FileUploadCommand(fileName: string, fileBody: Buffer, mimetype: string) {
    return new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").bucketName,
        Key: generateS3ObjectKeyFromFilename(fileName),
        Body: fileBody,
        ContentType: mimetype,
        // NOTE: Not sure about correct value
        ContentDisposition: `inline; filename=${fileName}`,
      },
    })
  }

  private FileDeleteCommand(url: string) {
    const objectKey = getS3ObjectKeyFromUrl(url)

    return new DeleteObjectCommand({
      Bucket: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").bucketName,
      Key: objectKey,
    })
  }

  private async uploadFileToS3(file: Express.Multer.File): Promise<PutObjectCommandOutputExtended> {
    if (!file) {
      this.logger.error("No file provided for upload to S3.")
      return Promise.reject(new Error("File is required"))
    }

    try {
      const fileUploadCommand = this.FileUploadCommand(file.originalname, file.buffer, file.mimetype)

      this.logger.log(`Uploading file to S3 - "${file.originalname}"`)
      const uploadResult = await fileUploadCommand.done()
      this.logger.log(`File has been uploaded to S3 - ${file.originalname}`)

      return uploadResult as PutObjectCommandOutputExtended
    } catch (error) {
      this.logger.error(`Error while uploading file to S3 - ${file.originalname}`, error)

      return Promise.reject(error)
    }
  }

  private async deleteFileFromS3(url: string): Promise<DeleteObjectOutput> {
    if (!url) {
      this.logger.error("No URL provided for file delete from S3.")
      return Promise.reject(new Error("URL is required"))
    }

    try {
      const fileDeleteCommand = this.FileDeleteCommand(url)

      this.logger.log(`Deleting file from S3 - ${url}`)
      const result = await this.s3Client.send(fileDeleteCommand)
      this.logger.log(`File has been deleted from S3 - ${url}`)

      return result
    } catch (error) {
      this.logger.error(`Error while deleting file from S3 - ${url}`, error)

      return Promise.reject(error)
    }
  }
}
