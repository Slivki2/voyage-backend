import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { IsBoolean, IsMimeType, IsOptional, IsString, IsUrl, IsUUID } from "class-validator"

export class Image {
  @ApiProperty({
    type: String,
    description: "The id of the image",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  @IsUUID(4, { message: "Invalid UUID" })
  id: string

  @ApiProperty({
    type: String,
    description: "The url of the image",
    example: "https://example.com/image.jpg",
    required: true,
  })
  @IsString()
  @IsUrl()
  url: string

  @ApiProperty({
    type: String,
    description: "The alt text of the image",
    example: "A beautiful image",
    required: false,
  })
  @IsString()
  @IsOptional()
  alt: string

  @ApiProperty({
    type: String,
    description: "The type of the image",
    example: "png",
    required: true,
  })
  @IsString()
  @IsMimeType()
  type: string

  @ApiProperty({
    type: Boolean,
    description: "The deleted status of the image",
    example: false,
    required: true,
  })
  @IsBoolean()
  @Exclude()
  deleted: boolean
}
