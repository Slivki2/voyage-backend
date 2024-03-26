import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { GuideCategoryDto } from "./guide-category.dto"

export class GetGuideCategoriesResponseDto implements ApiResponse<GuideCategoryDto[]> {
  @ApiProperty({
    type: [GuideCategoryDto],
    description: "Guide categories",
    required: true,
    example: [
      {
        key: "c7912662-26ea-435c-a1f7-66f52d1440ff",
        name: "City Guide",
        imageUrl: "https://example.com/city-guide.png",
        deleted: false,
        createdAt: "2021-08-24T06:00:00.000Z",
        updatedAt: "2021-08-24T06:00:00.000Z",
      },
    ],
  })
  data: GuideCategoryDto[]

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "Guide categories not found",
        name: "NotFoundError",
        stack: `Error: Guide categories not found\n    at Object.<anonymous> (/app/src/modules/guide-categories/guide-categories.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
