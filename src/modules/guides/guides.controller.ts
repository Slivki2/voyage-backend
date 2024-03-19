import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import { CreateGuideResponseDto } from "./dto/create-guide-response.dto"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { GetGuideResponseDto } from "./dto/get-guide-response.dto"
import { GetGuidesQueryDto } from "./dto/get-guides-query.dto"
import { GetGuidesResponseDto } from "./dto/get-guides-response.dto"
import { GuideDto } from "./dto/guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"
import { GuidesService } from "./guides.service"

@ApiTags("guides")
@Controller("guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new guide" })
  @ApiCreatedResponse({
    description: "The guide has been successfully created.",
    type: CreateGuideResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiBody({ type: CreateGuideDto, required: true, description: "The guide to create" })
  async create(@Body() createGuideDto: CreateGuideDto): Promise<CreateGuideResponseDto> {
    try {
      const creationResult = await this.guidesService.create(createGuideDto)

      return {
        data: creationResult,
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

      return {
        data: null,
        errors: [
          {
            message: "Unexpected error creating guide",
            name: "UnexpectedError",
            stack: null,
          },
        ],
      }
    }
  }

  @Get()
  @ApiOperation({ summary: "Get filtered guides" })
  @ApiQuery({ name: "page", type: Number, required: false, example: 1, description: "The page number" })
  @ApiQuery({ name: "pageSize", type: Number, required: false, example: 10, description: "The page size" })
  @ApiOkResponse({
    description: "The guides have been successfully retrieved.",
    type: GetGuidesResponseDto,
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
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )
    paginationQuery: GetGuidesQueryDto,
  ): Promise<GetGuidesResponseDto> {
    try {
      const guides = await this.guidesService.findAll(paginationQuery)

      return {
        data: guides,
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
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    example: "9a55ee15-d3b6-464f-85b8-755d314b33c1",
    description: "Guide id",
  })
  @ApiOperation({ summary: "Get a guide by id" })
  @ApiOkResponse({
    type: GuideDto,
    description: "The guide has been successfully retrieved.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async findOne(@Param("id") id: string): Promise<GetGuideResponseDto> {
    try {
      const result = await this.guidesService.findOne(id)

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

  @Patch(":id")
  @ApiOperation({ summary: "Update a guide by id" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateGuideDto })
  @ApiOkResponse({
    description: "The guide has been successfully updated.",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  update(@Param("id") id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(id, updateGuideDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a guide by id" })
  @ApiParam({ name: "id", type: String })
  @ApiOkResponse({
    description: "The guide has been successfully deleted.",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  remove(@Param("id") id: string) {
    return this.guidesService.remove(id)
  }
}
