import { ApiProperty, PickType } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsUUID } from "class-validator"
import { Guide } from "../entities/guide.entity"

export class UpdateGuideDto extends PickType(Guide, ["id", "name", "text", "primaryImages", "contentImages"] as const) {
  @ApiProperty({
    type: [String],
    description: "The list of cities ids the guide is about",
    example: ["9a55ee15-d3b6-464f-85b8-755d314b33c1"],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(1)
  cities: string[]

  @ApiProperty({
    type: [String],
    description: "The list of countries ids the guide is about",
    example: ["9a55ee15-d3b6-464f-85b8-755d314b33c1"],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(1)
  countries: string[]
}
