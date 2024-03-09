import { ApiProperty } from "@nestjs/swagger"
import { ImageUploadResult } from "../../aws-s3/types"

export class UploadImagesResponseDto {
  @ApiProperty({
    type: [ImageUploadResult],
    description: "The uploaded images",
    example: [
      {
        key: "image1.jpg",
        url: "https://example.com/image1.jpg",
        error: null,
      },
    ],
    required: true,
  })
  data: ImageUploadResult[]

  @ApiProperty({
    type: [Error],
    description: "The errors",
    example: [
      {
        message: "The file is too large",
      },
    ],
    required: false,
  })
  errors: Error[] | null
}
