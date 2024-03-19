import { Type } from "class-transformer"
import { IsBoolean, IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator"
import { Country } from "../../countries/entities/country.entity"
import { Image } from "../../images/entities/image.entity"

export class City {
  @IsNotEmpty()
  @IsUUID(4, { message: "Invalid UUID" })
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  description: string

  @Type(() => Country)
  country: Country

  @Type(() => Image)
  images: Image[]

  @IsBoolean()
  deleted: boolean

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date
}
