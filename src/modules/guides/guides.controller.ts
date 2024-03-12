import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"
import { GuidesService } from "./guides.service"

@ApiTags("guides")
@Controller("guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new guide" })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiCreatedResponse({
    description: "The guide has been successfully created.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiBody({ type: CreateGuideDto })
  create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto)
  }

  @Get(":id")
  @ApiParam({ name: "id", type: String })
  @ApiOperation({ summary: "Get a guide by id" })
  @ApiOkResponse({
    description: "The guide has been successfully retrieved.",
  })
  @ApiNotFoundResponse({
    description: "Guide not found",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiParam({ name: "id", type: String })
  findOne(@Param("id") id: string) {
    return this.guidesService.findOne(id)
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
