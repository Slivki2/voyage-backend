import { Injectable } from "@nestjs/common"
import { AwsS3Service } from "../aws-s3/aws-s3.service"
import { UploadImagesDto } from "./dto/upload-images.dto"

@Injectable()
export class ImagesService {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  async upload(imagesDto: UploadImagesDto) {
    const uploadedFilesResult = await this.awsS3Service.uploadFiles(imagesDto.files)

    return uploadedFilesResult
  }

  async delete(urls: string[]) {
    const deleteResult = await this.awsS3Service.deleteFiles(urls)

    return deleteResult
  }
}
