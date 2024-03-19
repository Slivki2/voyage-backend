import { Controller, Get, NotFoundException, Param, Query, ValidationPipe } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger"
import { CountriesService } from "./countries.service"
import { GetCountriesQueryDto } from "./dto/get-countries-query.dto"
import { GetCountriesResponseDto } from "./dto/get-countries-response.dto"
import { GetCountryResponseDto } from "./dto/get-country-response.dto"

@ApiTags("countries")
@Controller("countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: "Get countries by query" })
  @ApiQuery({
    name: "pageSize",
    required: false,
    type: Number,
    example: 10,
    description: "Limit of countries",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    example: 1,
    description: "Page number",
  })
  @ApiOkResponse({
    description: "Countries have been successfully received.",
    type: GetCountriesResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationQuery: GetCountriesQueryDto,
  ): Promise<GetCountriesResponseDto> {
    try {
      const result = await this.countriesService.findAll(paginationQuery)

      return {
        data: result,
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get country by id" })
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    example: "25769c6c-d34d-4bfe-ba98-e0ee856f3e7a",
    description: "Country id",
  })
  @ApiOkResponse({
    description: "Country has been successfully received.",
    type: GetCountryResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiNotFoundResponse({
    description: "Country not found",
  })
  async findOne(@Param("id") id: string): Promise<GetCountryResponseDto> {
    try {
      const result = await this.countriesService.findOne(id)

      if (!result) {
        throw new NotFoundException()
      }

      return {
        data: result,
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof NotFoundException) {
          throw error
        }

        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }
    }
  }
}
