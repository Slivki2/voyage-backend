import { Injectable, Logger } from "@nestjs/common"
import { AwsS3Service } from "../aws-s3/aws-s3.service"
import { ImageDto } from "./dto/image.dto"
import { UploadImagesDto } from "./dto/upload-images.dto"

@Injectable()
export class ImagesService {
  constructor(
    private readonly logger: Logger,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async upload(imagesDto: UploadImagesDto) {
    try {
      const uploadedFilesResult = await this.awsS3Service.uploadFiles(imagesDto.files)

      const imageDtos = uploadedFilesResult.map<ImageDto>(result => {
        return {
          // TODO: fill necessary fields
          // id: result.id,
          url: result.url,
          // type: result.type,
          // alt: result.alt,
        }
      })

      return imageDtos
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error while uploading images: ${error.message}`)
      }

      this.logger.error("Unexpected error while uploading images")

      throw error
    }
  }

  async delete(urls: string[]) {
    const deleteResult = await this.awsS3Service.deleteFiles(urls)

    return deleteResult
  }
}
