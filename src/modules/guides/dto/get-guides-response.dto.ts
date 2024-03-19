import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { GuideDto } from "./guide.dto"

export class GetGuidesResponseDto implements ApiResponse<GuideDto[]> {
  @ApiProperty({
    type: [GuideDto],
    description: "The guides data",
    required: true,
  })
  data: GuideDto[]

  @ApiProperty({
    type: [ApiError],
    description: "The error messages",
    example: [
      {
        message: "Guide not found",
        name: "NotFoundError",
        stack: `Error: Guide not found\n    at Object.<anonymous> (/app/src/modules/guides/guides.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
