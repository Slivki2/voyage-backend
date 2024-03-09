import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { EnvironmentConfig } from "../../config/env/env-configuration"
import { ImageUploadResult, PutObjectCommandOutputExtended } from "./types"
import { toImageUploadErrorResult, toImageUploadSuccessResult } from "./utils"

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

  async uploadFiles(files: Express.Multer.File[]): Promise<ImageUploadResult[] | null> {
    const fileUploadPromises = files.map(file => {
      return this.uploadFileToS3(file)
    })

    try {
      this.logger.log(`Uploading batch (${files.length}) of files to S3`)
      const s3UploadResults = await Promise.allSettled(fileUploadPromises)
      this.logger.log("Files have been uploaded to S3")

      const results = s3UploadResults.map(result => {
        if (result.status === "fulfilled") {
          return toImageUploadSuccessResult(result.value)
        } else {
          this.logger.error("Error while uploading files to S3", result.reason)
          return toImageUploadErrorResult()
        }
      })

      return results
    } catch (error) {
      this.logger.error("Error while uploading files to S3", error)

      return null
    }
  }

  private ImageUploadCommand(fileName: string, fileBody: Buffer, mimetype: string) {
    return new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.configService.get<EnvironmentConfig["awsS3"]>("awsS3").bucketName,
        Key: fileName,
        Body: fileBody,
        ContentType: mimetype,
        // NOTE: Not sure about correct value
        ContentDisposition: `inline; filename=${fileName}`,
      },
    })
  }

  private async uploadFileToS3(file: Express.Multer.File): Promise<PutObjectCommandOutputExtended> {
    try {
      const imageUploadCommand = this.ImageUploadCommand(file.originalname, file.buffer, file.mimetype)

      this.logger.log(`Uploading file to S3 - "${file.originalname}"`)
      const uploadResult = await imageUploadCommand.done()
      this.logger.log(`File has been uploaded to S3 - ${file.originalname}`)

      return uploadResult as PutObjectCommandOutputExtended
    } catch (error) {
      this.logger.error(`Error while uploading file to S3 - ${file.originalname}`, error)

      return null
    }
  }
}
