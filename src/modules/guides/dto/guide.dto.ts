import { PartialType } from "@nestjs/swagger"
import { Guide } from "../entities/guide"

export class GuideDto extends PartialType(Guide) {
  id: string

  name: string

  text: string

  createdAt: Date

  updatedAt: Date
}
