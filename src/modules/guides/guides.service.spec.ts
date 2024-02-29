import { Test, TestingModule } from "@nestjs/testing"
import { PrismaModule } from "../prisma/prisma.module"
import { GuidesService } from "./guides.service"

describe("GuidesService", () => {
  let service: GuidesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GuidesService],
    }).compile()

    service = module.get<GuidesService>(GuidesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
