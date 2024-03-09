import { Injectable } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { PrismaService } from "../prisma/prisma.service"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { GuideDto } from "./dto/guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"

@Injectable()
export class GuidesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGuideDto: CreateGuideDto): Promise<GuideDto> {
    const createdGuide = await this.prismaService.guide.create({
      data: {
        name: createGuideDto.name,
        text: createGuideDto.text,
      },
    })

    const createdGuideDto = plainToClass(GuideDto, createdGuide)

    return createdGuideDto
  }

  async findOne(id: string): Promise<GuideDto> {
    const guide = await this.prismaService.guide.findUnique({ where: { id } })

    const guideDto = plainToClass(GuideDto, guide)

    return guideDto
  }

  async update(id: string, updateGuideDto: UpdateGuideDto) {
    const updatedGuide = this.prismaService.guide.update({
      data: {
        id: id,
        name: updateGuideDto.name,
        text: updateGuideDto.text,
      },
      where: { id },
    })

    const updatedGuideDto = plainToClass(GuideDto, updatedGuide)

    return updatedGuideDto
  }

  async remove(id: string) {
    const removedGuide = await this.prismaService.guide.delete({ where: { id } })

    const removedGuideDto = plainToClass(GuideDto, removedGuide)

    return removedGuideDto
  }
}
