import { Type } from "class-transformer"
import { IsString, IsUUID, IsNotEmpty, IsBoolean, IsDate } from "class-validator"
import { City } from "../../guides/entities/city"
import { Image } from "../../images/entities/image.entity"

export class Country {
  @IsNotEmpty()
  @IsUUID(4, { message: "Invalid UUID" })
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  description: string

  @Type(() => Image)
  images: Image[]

  @Type(() => City)
  cities: City[]

  @IsBoolean()
  deleted: boolean

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date
}
