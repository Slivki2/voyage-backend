import { ApiProperty } from "@nestjs/swagger"
import { FileUploadResult } from "../../aws-s3/types"
import { ApiResponse } from "../../common/types"

export class UploadImagesResponse implements ApiResponse<FileUploadResult[]> {
  @ApiProperty({
    type: [FileUploadResult],
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
  data: FileUploadResult[]

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
