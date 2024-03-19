import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { CitiesController } from "./cities.controller"
import { CitiesService } from "./cities.service"

describe("CitiesController", () => {
  let controller: CitiesController
  let citiesService: CitiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CitiesController],
      providers: [CitiesService, MockedLogger],
    }).compile()

    controller = module.get<CitiesController>(CitiesController)
    citiesService = module.get<CitiesService>(CitiesService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
