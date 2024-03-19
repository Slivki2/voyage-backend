import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { CityDto } from "./city.dto"

export class GetCitiesResponseDto implements ApiResponse<CityDto[]> {
  @ApiProperty({
    type: [CityDto],
    description: "List of cities",
    required: true,
    example: [
      {
        id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
        name: "Paris",
        description: "Paris is the capital city of France",
        country: {
          id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
          name: "France",
          description: "France is a country located in Western Europe",
          images: [
            {
              url: "https://example.com/image.jpg",
              type: "jpg",
              alt: "Eiffel Tower",
            },
          ],
          deleted: false,
        },
        images: [
          {
            url: "https://example.com/image.jpg",
            type: "jpg",
            alt: "Eiffel Tower",
          },
        ],
      },
    ],
  })
  data: CityDto[]

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
