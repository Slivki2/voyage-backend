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
import { CitiesService } from "./cities.service"
import { GetCitiesQueryDto } from "./dto/get-cities-query.dto"
import { GetCitiesResponseDto } from "./dto/get-cities-response.dto"
import { GetCityResponseDto } from "./dto/get-city-response.dto"

@ApiTags("cities")
@Controller("cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({ summary: "Get cities by query" })
  @ApiQuery({
    name: "pageSize",
    required: false,
    type: Number,
    example: 10,
    description: "Limit of cities",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    example: 1,
    description: "Page number",
  })
  @ApiOkResponse({
    type: GetCitiesResponseDto,
    description: "Cities have been successfully received.",
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
    paginationQuery: GetCitiesQueryDto,
  ): Promise<GetCitiesResponseDto> {
    try {
      const page = await this.citiesService.findAll(paginationQuery)

      return {
        data: page,
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
  @ApiOperation({ summary: "Get city by id" })
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    description: "City id",
  })
  @ApiOkResponse({
    type: GetCityResponseDto,
    description: "City has been successfully received.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiNotFoundResponse({
    description: "City not found",
  })
  async findOne(@Param("id") id: string): Promise<GetCityResponseDto> {
    try {
      const result = await this.citiesService.findOne(id)

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
