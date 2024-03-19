import { Injectable, Logger } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from "../common/constants"
import { PaginationQuery } from "../common/types"
import { PrismaService } from "../prisma/prisma.service"
import { DEFAULT_COUNTRIES_PAGE_SIZE } from "./constants"
import { CountryDto } from "./dto/country.dto"

@Injectable()
export class CountriesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(query: PaginationQuery): Promise<CountryDto[]> {
    let limit = query?.pageSize || DEFAULT_COUNTRIES_PAGE_SIZE
    limit = limit > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : limit

    const page = query?.page || DEFAULT_PAGE

    try {
      const results = await this.prismaService.country.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          deleted: false,
        },
        include: {
          images: true,
        },
      })

      const countriesDtos = plainToInstance(CountryDto, results)

      return countriesDtos
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting countries: ${error.toString()}`)

        throw error
      }
    }
  }

  async findOne(id: string): Promise<CountryDto | null> {
    try {
      const result = await this.prismaService.country.findUnique({
        where: { id, deleted: false },
      })

      if (result) {
        const countryDto = plainToInstance(CountryDto, result)

        return countryDto
      }

      return null
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error getting country: ${error.toString()}`)

        throw error
      }
    }
  }
}
