import { PartialType } from "@nestjs/mapped-types"
import { PickType } from "@nestjs/swagger"
import { CreateGuideDto } from "./create-guide.dto"

export class UpdateGuideDto extends PickType(CreateGuideDto, ["name", "text"] as const) {}
