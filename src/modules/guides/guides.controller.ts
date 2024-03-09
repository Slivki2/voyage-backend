import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger"
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
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 201,
    description: "The guide has been successfully created.",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  @ApiBody({ type: CreateGuideDto })
  create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto)
  }

  @Get(":id")
  @ApiParam({ name: "id", type: String })
  @ApiOperation({ summary: "Get a guide by id" })
  @ApiResponse({
    status: 200,
    description: "The guide has been successfully retrieved.",
  })
  @ApiResponse({
    status: 404,
    description: "Guide not found",
  })
  @ApiResponse({
    status: 500,
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
  @ApiResponse({
    status: 200,
    description: "The guide has been successfully updated.",
  })
  @ApiResponse({
    status: 404,
    description: "Guide not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  update(@Param("id") id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(id, updateGuideDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a guide by id" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({
    status: 200,
    description: "The guide has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "Guide not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  remove(@Param("id") id: string) {
    return this.guidesService.remove(id)
  }
}
