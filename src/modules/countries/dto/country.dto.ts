import { ApiProperty, PickType } from "@nestjs/swagger"
import { City } from "../../cities/entities/city.entity"
import { Image } from "../../images/entities/image.entity"
import { Country } from "../entities/country.entity"

export class CountryDto extends PickType(Country, ["id", "name", "description", "cities", "images"] as const) {
  @ApiProperty({ type: [City] })
  id: string

  name: string
  description: string
  cities: City[]
  images: Image[]
  deleted: boolean
}
