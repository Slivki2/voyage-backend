import { Type } from "class-transformer"
import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator"
import { City } from "./city"
import { Country } from "./country"
import { Image } from "./image"

export class Guide {
  @IsUUID(4, { message: "Invalid UUID" })
  id: string

  @IsString()
  name: string

  @IsString()
  text: string

  @Type(() => Image)
  primaryImages: Image[]

  @Type(() => Image)
  contentImages: Image[]

  @Type(() => Country)
  countries: Country[]

  @Type(() => City)
  cities: City[]

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date

  @IsBoolean()
  deleted: boolean
}
