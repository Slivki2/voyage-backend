import { PartialType } from "@nestjs/swagger"
import { UploadImagesDto } from "./upload-images.dto"

export class UpdateImageDto extends PartialType(UploadImagesDto) {}
