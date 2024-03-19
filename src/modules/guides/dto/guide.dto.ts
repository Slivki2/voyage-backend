import { ApiProperty, PickType } from "@nestjs/swagger"
import { Exclude, Type } from "class-transformer"
import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator"
import { Image } from "../../images/entities/image.entity"
import { City } from "../entities/city"
import { Country } from "../entities/country"
import { Guide } from "../entities/guide.entity"

export class GuideDto extends PickType(Guide, ["id", "name", "text"] as const) {
  @ApiProperty({
    type: String,
    description: "The id of the guide",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  @IsUUID(4, { message: "Invalid UUID" })
  id: string

  @ApiProperty({
    type: String,
    description: "The name of the guide",
    example: "Travel Guide to Paris",
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    type: String,
    description: "The content of the guide",
    example: "Paris is the capital city of France",
    required: true,
  })
  @IsString()
  text: string

  @ApiProperty({
    type: [Image],
    description: "The primary images of the guide",
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
  primaryImages: Image[]

  @ApiProperty({
    type: [String],
    description: "The content images of the guide",
    example: [
      {
        url: "https://example.com/image.jpg",
        type: "jpg",
        alt: "Eiffel Tower",
      },
    ],
    required: false,
  })
  @Type(() => Image)
  contentImages: Image[]

  @ApiProperty({
    type: () => [Country],
    description: "The countries mentioned in the guide",
    example: ["France"],
    required: true,
  })
  @Type(() => Country)
  countries: Country[]

  @ApiProperty({
    type: () => [City],
    description: "The cities mentioned in the guide",
    example: ["Paris"],
    required: true,
  })
  @Type(() => City)
  cities: City[]

  @ApiProperty({
    type: Date,
    description: "The date the guide was created",
    example: "2021-08-01T00:00:00.000Z",
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    type: Date,
    description: "The date the guide was last updated",
    example: "2021-08-01T00:00:00.000Z",
  })
  @IsDate()
  updatedAt: Date

  @ApiProperty({
    type: Boolean,
    description: "Whether the guide has been deleted",
    example: false,
    default: false,
  })
  @IsBoolean()
  @Exclude()
  deleted: boolean
}
