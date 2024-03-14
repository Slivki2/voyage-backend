import { Injectable, Logger } from "@nestjs/common"
import { plainToClass, plainToInstance } from "class-transformer"
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from "../common/constants"
import { PaginationQuery } from "../common/types"
import { PrismaService } from "../prisma/prisma.service"
import { DEFAULT_GUIDES_PAGE_SIZE } from "./constants"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { GuideDto } from "./dto/guide.dto"
import { UpdateGuideDto } from "./dto/update-guide.dto"

@Injectable()
export class GuidesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createGuideDto: CreateGuideDto): Promise<GuideDto> {
    const createdGuide = await this.prismaService.guide.create({
      data: {
        name: createGuideDto.name,
        text: createGuideDto.text,
        // primaryImages: {
        //   create: createGuideDto.primaryImages,
        // },
        // contentImages: {
        //   create: createGuideDto.contentImages,
        // },
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

  async findAll(query: PaginationQuery): Promise<GuideDto[]> {
    let limit = query?.pageSize ?? DEFAULT_GUIDES_PAGE_SIZE
    limit = limit > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : limit

    const page = query?.page ?? DEFAULT_PAGE

    try {
      const guides = await this.prismaService.guide.findMany({
        include: {
          primaryImages: true,
          contentImages: true,
        },
        take: limit,
      })

      const guidesDto = plainToInstance(GuideDto, guides)

      return guidesDto
    } catch (error) {
      console.error(error)
      // TODO: Implement correct handling of DB errors
      this.logger.error("Error fetching guides", { error })

      throw error
    }
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
