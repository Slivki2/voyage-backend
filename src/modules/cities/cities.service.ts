import { Injectable, Logger } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import prisma from "../../test-utils/prisma/client"
import { PageDto, PaginationQuery } from "../common/types"
import { getValidPageNumber, getValidPageSize } from "../common/utils/pagination"
import { PrismaService } from "../prisma/prisma.service"
import { CityDto } from "./dto/city.dto"

@Injectable()
export class CitiesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(query: PaginationQuery): Promise<PageDto<CityDto>> {
    const pageSize = getValidPageSize({ pageSize: query?.pageSize })
    const page = getValidPageNumber({ page: query?.page })

    try {
      const [results, total] = await prisma.$transaction([
        this.prismaService.city.findMany({
          include: {
            country: true,
            images: true,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            deleted: false,
          },
          orderBy: {
            name: "asc",
          },
        }),
        this.prismaService.city.count({
          where: {
            deleted: false,
          },
        }),
      ])
      const hasMore = total > page * pageSize

      const citiesDtos = plainToInstance(CityDto, results)
      const citiesPage = new PageDto<CityDto>(citiesDtos, total, page, pageSize, hasMore)

      return citiesPage
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting cities: ${error.toString()}`)

        throw error
      }
    }
  }

  async findOne(id: string): Promise<CityDto | null> {
    try {
      const result = await this.prismaService.city.findUnique({
        where: { id, deleted: false },
        include: {
          country: true,
          images: true,
        },
      })

      const cityDto = plainToInstance(CityDto, result)

      return cityDto
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching city: ${error.message}`)

        throw error
      }
    }
  }
}
