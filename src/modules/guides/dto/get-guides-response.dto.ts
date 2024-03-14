import { ApiProperty } from "@nestjs/swagger"
import { ApiResponse } from "../../common/types"
import { GuideDto } from "./guide.dto"

export class GetGuidesResponseDto implements ApiResponse<GuideDto[]> {
  @ApiProperty({
    type: [GuideDto],
    description: "The guides data",
    required: true,
  })
  data: GuideDto[]

  @ApiProperty({
    type: Error,
    description: "The error messages",
    example: ["Error fetching guides"],
    required: false,
  })
  errors: Error[] | null
}
