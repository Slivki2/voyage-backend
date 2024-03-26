import { Injectable, Logger } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { MAX_PAGE_SIZE } from "../common/constants"
import { PrismaService } from "../prisma/prisma.service"
import { GuideCategoryDto } from "./dto/guide-category.dto"

@Injectable()
export class GuideCategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<GuideCategoryDto[]> {
    const limit = MAX_PAGE_SIZE
    const page = 1

    try {
      const result = await this.prismaService.guideCategory.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          deleted: false,
        },
      })

      const guideCategoriesDtos = plainToInstance(GuideCategoryDto, result)

      return guideCategoriesDtos
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting guide categories: ${error.toString()}`)

        throw error
      }

      this.logger.error("An unexpected error occurred while getting guide categories")
      throw new Error("An error occurred while getting guide categories")
    }
  }
}
