import { Injectable, Logger } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { plainToClass, plainToInstance } from "class-transformer"
import { DEFAULT_PAGE, MAX_PAGE_SIZE, PRISMA_ERROR_CODES } from "../common/constants"
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
    try {
      const createdGuide = await this.prismaService.guide.create({
        data: {
          name: createGuideDto.name,
          text: createGuideDto.text,
          primaryImages: {
            create: createGuideDto.primaryImages,
          },
          contentImages: {
            create: createGuideDto.contentImages,
          },
          countries: {
            connect: createGuideDto.countries.map(countryId => {
              return {
                id: countryId,
              }
            }),
          },
          cities: {
            connect: createGuideDto.cities.map(cityId => {
              return {
                id: cityId,
              }
            }),
          },
        },
        include: {
          primaryImages: true,
          contentImages: true,
          cities: true,
          countries: true,
        },
      })

      const createdGuideDto = plainToInstance(GuideDto, createdGuide)

      return createdGuideDto
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
          this.logger.error(`Error creating guide: model - ${error.meta?.modelName}, target - ${error.meta?.target}`)
          throw new Error("Guide with this name already exists")
        }
      }

      if (error instanceof Error) {
        console.error("CreateGuide", error.toString())
        this.logger.error(`Error creating guide: ${error.message}`)

        throw error
      }

      this.logger.error("Unexpected error creating guide")
      throw error
    }
  }

  async findOne(id: string): Promise<GuideDto | null> {
    try {
      const guide = await this.prismaService.guide.findUnique({ where: { id, deleted: false } })

      const guideDto = plainToInstance(GuideDto, guide)

      return guideDto
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching guide: ${error.message}`)

        throw error
      }

      this.logger.error("Unexpected error fetching guide")
      throw error
    }
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
        skip: (page - 1) * limit,
        where: {
          deleted: false,
        },
      })

      const guidesDto = plainToInstance(GuideDto, guides)

      return guidesDto
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching guides: ${error.message}`)

        throw error
      }

      this.logger.error("Unexpected error fetching guides")
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
      where: { id, deleted: false },
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
