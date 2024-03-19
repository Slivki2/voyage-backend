import { Logger, Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { CountriesService } from "./countries.service"
import { CountriesController } from "./countries.controller"

@Module({
  imports: [PrismaModule],
  controllers: [CountriesController],
  providers: [CountriesService, Logger],
})
export class CountriesModule {}
