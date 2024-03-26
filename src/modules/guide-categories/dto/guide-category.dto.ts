import { ApiProperty, PickType } from "@nestjs/swagger"
import { GuideCategory } from "../entities/guide-category.entity"

export class GuideCategoryDto extends PickType(GuideCategory, ["key", "name", "imageUrl"] as const) {
  @ApiProperty({
    type: String,
    description: "The key of the guide category",
    example: "explore-city",
    required: true,
  })
  key: string

  @ApiProperty({
    type: String,
    description: "The name of the guide category",
    example: "Explore City",
    required: true,
  })
  name: string

  @ApiProperty({
    type: String,
    description: "The image URL of the guide category",
    example: "https://example.com/explore-city.png",
    required: true,
  })
  imageUrl: string
}
