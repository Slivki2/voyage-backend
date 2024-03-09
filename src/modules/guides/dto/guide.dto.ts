import { PartialType } from "@nestjs/swagger"
import { Guide } from "../entities/guide.entity"

export class GuideDto extends PartialType(Guide) {
  id: string

  name: string

  text: string

  deleted: boolean

  createdAt: Date

  updatedAt: Date
}
