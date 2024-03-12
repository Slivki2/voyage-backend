import { ApiProperty } from "@nestjs/swagger"
import { FileDeleteResult } from "../../aws-s3/types"
import { ApiResponse } from "../../common/types"

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
    type: [Error],
    description: "The errors",
    example: [
      {
        message: "Invalid file URL",
      },
    ],
    required: false,
  })
  errors: Error[] | null
}
