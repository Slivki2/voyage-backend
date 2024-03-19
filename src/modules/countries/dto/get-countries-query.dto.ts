import { Type } from "class-transformer"
import { IsInt } from "class-validator"
import { PaginationQuery } from "../../common/types"

export class GetCountriesQueryDto implements PaginationQuery {
  @IsInt()
  @Type(() => Number)
  page: number

  @IsInt()
  @Type(() => Number)
  pageSize: number
}
