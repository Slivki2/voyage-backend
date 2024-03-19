import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { CityDto } from "./city.dto"

export class GetCityResponseDto implements ApiResponse<CityDto> {
  @ApiProperty({
    type: CityDto,
    description: "City",
    required: true,
    example: {
      id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
      name: "Tashkent",
      description: "Tashkent is the capital city of Uzbekistan",
      cities: [],
      images: [],
      deleted: false,
    },
  })
  data: CityDto

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "Country not found",
        name: "NotFoundError",
        stack: `Error: Country not found\n    at Object.<anonymous> (/app/src/modules/countries/countries.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
