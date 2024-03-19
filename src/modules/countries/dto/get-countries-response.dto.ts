import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { CountryDto } from "./country.dto"

export class GetCountriesResponseDto implements ApiResponse<CountryDto[]> {
  @ApiProperty({
    type: [CountryDto],
    description: "List of countries",
    required: true,
    example: [
      {
        id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
        name: "Ukraine",
        description: "Ukraine is a country in Eastern Europe.",
        cities: [],
        images: [],
        deleted: false,
      },
    ],
  })
  data: CountryDto[]

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
