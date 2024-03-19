import { Logger, Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { CitiesService } from "./cities.service"
import { CitiesController } from "./cities.controller"

@Module({
  imports: [PrismaModule],
  controllers: [CitiesController],
  providers: [CitiesService, Logger],
})
export class CitiesModule {}
