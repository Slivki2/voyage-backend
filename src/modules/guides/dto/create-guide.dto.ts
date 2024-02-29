import { ApiProperty, PickType } from "@nestjs/swagger"
import { Guide } from "../entities/guide"

export class CreateGuideDto extends PickType(Guide, ["name", "text"]) {
  @ApiProperty()
  name: string

  @ApiProperty()
  text: string
}
