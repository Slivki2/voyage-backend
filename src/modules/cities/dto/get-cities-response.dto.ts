import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse, PageDto } from "../../common/types"
import { CityDto } from "./city.dto"

export class GetCitiesResponseDto implements ApiResponse<PageDto<CityDto>> {
  @ApiProperty({
    type: [PageDto<CityDto>],
    description: "List of cities",
    required: true,
    example: [
      {
        items: [
          {
            id: "1",
            name: "City 1",
            country: {
              id: "1",
              name: "Country 1",
            },
            images: [
              {
                id: "1",
                url: "https://example.com/image.jpg",
              },
            ],
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
        hasMore: false,
      },
    ],
  })
  data: PageDto<CityDto>

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "City not found",
        name: "NotFoundError",
        stack: `Error: City not found\n    at Object.<anonymous> (/app/src/modules/cities/cities.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
