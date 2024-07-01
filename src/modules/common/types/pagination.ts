import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsInt, Max, Min } from "class-validator"

export type PaginationQuery = {
  page?: number
  pageSize?: number
}

export class PageDto<T> {
  @ApiProperty({
    type: [Object],
    description: "List of items",
    isArray: true,
    required: true,
    example: [
      {
        id: "1",
        name: "Item 1",
      },
    ],
  })
  public readonly items: T[] | null

  @ApiProperty({
    type: Number,
    description: "Total number of items",
    required: true,
    example: 1,
    minimum: 0,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly total: number

  @ApiProperty({
    type: Number,
    description: "Current page number",
    required: true,
    example: 1,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly page: number

  @ApiProperty({
    type: Number,
    description: "Number of items per page",
    required: true,
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly pageSize: number

  @ApiProperty({
    type: Boolean,
    description: "Has more items",
    required: true,
    example: false,
  })
  @Type(() => Boolean)
  @IsBoolean()
  public readonly hasMore: boolean

  constructor(items: T[], total: number, page: number, pageSize: number, hasMore: boolean) {
    this.items = items || []
    this.total = total || 0
    this.page = page || 1
    this.pageSize = pageSize || 10
    this.hasMore = hasMore || false
  }
}
