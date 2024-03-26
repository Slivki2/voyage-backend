import { Logger, Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { GuideCategoriesService } from "./guide-categories.service"
import { GuideCategoriesController } from "./guide-categories.controller"

@Module({
  imports: [PrismaModule],
  controllers: [GuideCategoriesController],
  providers: [GuideCategoriesService, Logger],
})
export class GuideCategoriesModule {}
