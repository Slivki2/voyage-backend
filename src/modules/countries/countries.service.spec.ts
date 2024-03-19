import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { CountriesService } from "./countries.service"

describe("CountriesService", () => {
  let service: CountriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CountriesService, MockedLogger],
    }).compile()

    service = module.get<CountriesService>(CountriesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
