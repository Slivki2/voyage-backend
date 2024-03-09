import { Injectable } from "@nestjs/common"
import { AwsS3Service } from "../aws-s3/aws-s3.service"
import { UploadImagesDto } from "./dto/upload-images.dto"

@Injectable()
export class ImagesService {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  async upload(imagesDto: UploadImagesDto) {
    const uploadedFiles = await this.awsS3Service.uploadFiles(imagesDto.files)

    return uploadedFiles
  }
}
