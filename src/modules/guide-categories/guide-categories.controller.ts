import { Controller, Get } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { GetGuideCategoriesResponseDto } from "./dto/get-guide-categories-response.dto"
import { GuideCategoriesService } from "./guide-categories.service"

@ApiTags("guide-categories")
@Controller("guide-categories")
export class GuideCategoriesController {
  constructor(private readonly guideCategoriesService: GuideCategoriesService) {}

  @Get()
  @ApiOperation({ summary: "Get all guide categories" })
  @ApiOkResponse({
    description: "Guide categories have been successfully received.",
    type: GetGuideCategoriesResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async findAll(): Promise<GetGuideCategoriesResponseDto> {
    try {
      const result = await this.guideCategoriesService.findAll()

      return {
        data: result,
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: [],
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
