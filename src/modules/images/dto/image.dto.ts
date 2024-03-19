import { OmitType, PartialType } from "@nestjs/swagger"
import { Image } from "../entities/image.entity"

export class ImageDto extends PartialType(OmitType(Image, ["deleted"] as const)) {}
