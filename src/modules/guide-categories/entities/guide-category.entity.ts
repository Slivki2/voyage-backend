import { Type } from "class-transformer"
import { IsString, IsUrl, IsNotEmpty, IsBoolean, IsDate } from "class-validator"
import { Guide } from "./guide"

export class GuideCategory {
  @IsString()
  @IsNotEmpty()
  key: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string

  @Type(() => Guide)
  guides: Guide[]

  @IsBoolean()
  deleted: boolean

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date
}
