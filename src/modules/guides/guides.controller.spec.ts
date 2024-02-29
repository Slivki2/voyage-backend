import { Test, TestingModule } from "@nestjs/testing"
import { PrismaModule } from "../prisma/prisma.module"
import { GuidesController } from "./guides.controller"
import { GuidesService } from "./guides.service"

describe("GuidesController", () => {
  let controller: GuidesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [GuidesController],
      providers: [GuidesService],
    }).compile()

    controller = module.get<GuidesController>(GuidesController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
