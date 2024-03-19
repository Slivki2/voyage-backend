import { ApiProperty, PickType } from "@nestjs/swagger"
import { Exclude, Type } from "class-transformer"
import { Country } from "../../guides/entities/country"
import { Image } from "../../images/entities/image.entity"
import { City } from "../entities/city.entity"

export class CityDto extends PickType(City, ["id", "name", "description", "country", "images"] as const) {
  @ApiProperty({
    type: String,
    description: "The id of the city",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  id: string

  @ApiProperty({ type: String, description: "The name of the city", example: "Paris", required: true })
  name: string

  @ApiProperty({
    type: String,
    description: "The description of the city",
    example: "Paris is the capital city of France",
    required: true,
  })
  description: string

  @ApiProperty({
    type: Country,
    description: "The country of the city",
    example: {
      id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
      name: "France",
      description: "France is a country located in Western Europe",
      images: [
        {
          url: "https://example.com/image.jpg",
          type: "jpg",
          alt: "Eiffel Tower",
        },
      ],
      deleted: false,
    },
    required: true,
  })
  country: Country

  @ApiProperty({
    type: [Image],
    description: "The images of the city",
    example: [
      {
        url: "https://example.com/image.jpg",
        type: "jpg",
        alt: "Eiffel Tower",
      },
    ],
    required: true,
    minItems: 1,
  })
  @Type(() => Image)
  images: Image[]

  @Exclude()
  deleted: boolean
}
