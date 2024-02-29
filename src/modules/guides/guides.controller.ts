import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { ApiBody, ApiParam } from "@nestjs/swagger"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"
import { GuidesService } from "./guides.service"

@Controller("guides")
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  @ApiBody({ type: CreateGuideDto })
  create(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto)
  }

  @Get(":id")
  @ApiParam({ name: "id", type: String })
  findOne(@Param("id") id: string) {
    return this.guidesService.findOne(id)
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateGuideDto })
  update(@Param("id") id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(id, updateGuideDto)
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: String })
  remove(@Param("id") id: string) {
    return this.guidesService.remove(id)
  }
}
