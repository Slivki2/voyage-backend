import { Injectable, Logger } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../common/constants"
import { PaginationQuery } from "../common/types"
import { PrismaService } from "../prisma/prisma.service"
import { CityDto } from "./dto/city.dto"

@Injectable()
export class CitiesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(query: PaginationQuery): Promise<CityDto[]> {
    let limit = query?.pageSize || DEFAULT_PAGE_SIZE
    limit = limit > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : limit

    const page = query?.page || DEFAULT_PAGE

    try {
      const results = await this.prismaService.city.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          deleted: false,
        },
        include: {
          country: true,
          images: true,
        },
      })

      const citiesDtos = plainToInstance(CityDto, results)

      return citiesDtos
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
