import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { ImageDto } from "./image.dto"

export class UploadImagesResponse implements ApiResponse<ImageDto[]> {
  @ApiProperty({
    type: [ImageDto],
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
  data: ImageDto[]

  @ApiProperty({
    type: [ApiError],
    description: "The errors",
    example: [
      {
        message: "File is too large",
        name: "ValidationError",
        stack: `Error: File is too large\n    at Object.<anonymous> (/app/src/modules/images/images.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
