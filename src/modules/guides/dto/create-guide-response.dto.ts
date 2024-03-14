import { ApiProperty } from "@nestjs/swagger"
import { ApiResponse } from "../../common/types"
import { GuideDto } from "./guide.dto"

export class CreateGuideResponseDto implements ApiResponse<GuideDto> {
  @ApiProperty({
    type: GuideDto,
    description: "The guide data",
    required: true,
  })
  data: GuideDto

  @ApiProperty({
    type: Error,
    description: "The error messages",
    example: ["Name is required"],
    required: false,
  })
  errors: Error[] | null
}
