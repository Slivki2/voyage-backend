import { PartialType, PickType } from "@nestjs/swagger"
import { Image } from "../entities/image.entity"

export class ImageDto extends PartialType(PickType(Image, ["id", "type", "url"] as const)) {
  id: string
  type: string
  url: string
}
