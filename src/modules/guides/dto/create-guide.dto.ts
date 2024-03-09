import { OmitType } from "@nestjs/swagger"
import { UpdateGuideDto } from "./update-guide.dto"

export class CreateGuideDto extends OmitType(UpdateGuideDto, ["id"] as const) {}
