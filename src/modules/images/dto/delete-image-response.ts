import { ApiProperty } from "@nestjs/swagger"
import { FileDeleteResult } from "../../aws-s3/types"
import { ApiError, ApiResponse } from "../../common/types"

export class DeleteImageResponse implements ApiResponse<FileDeleteResult[]> {
  @ApiProperty({
    type: [FileDeleteResult],
    description: "The deleted images",
    example: [
      {
        key: "image1.jpg",
        url: "https://example.com/image1.jpg",
        deleted: true,
        error: null,
      },
    ],
    required: true,
  })
  data: FileDeleteResult[]

  @ApiProperty({
    type: [ApiError],
    description: "The errors",
    example: [
      {
        message: "Invalid file URL",
        name: "ValidationError",
        stack: `Error: File not found\n    at Object.<anonymous> (/app/src/modules/images/images.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
