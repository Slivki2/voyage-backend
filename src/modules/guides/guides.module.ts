import { Logger, Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { GuidesService } from "./guides.service"
import { GuidesController } from "./guides.controller"

@Module({
  imports: [PrismaModule],
  controllers: [GuidesController],
  providers: [GuidesService, Logger],
  exports: [GuidesService],
})
export class GuidesModule {}
