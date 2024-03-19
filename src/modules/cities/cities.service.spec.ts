import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { CitiesService } from "./cities.service"

describe("CitiesService", () => {
  let service: CitiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CitiesService, MockedLogger],
    }).compile()

    service = module.get<CitiesService>(CitiesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
