import { Test, TestingModule } from "@nestjs/testing"
import { plainToInstance } from "class-transformer"
import { getGuideMock } from "../../test-utils/mocks/guides"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { CreateGuideResponseDto } from "./dto/create-guide-response.dto"
import { CreateGuideDto } from "./dto/create-guide.dto"
import { GuideDto } from "./dto/guide.dto"
import { GuidesController } from "./guides.controller"
import { GuidesService } from "./guides.service"

describe("GuidesController", () => {
  let controller: GuidesController
  let guidesService: GuidesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [GuidesController],
      providers: [GuidesService, MockedLogger],
    }).compile()

    controller = module.get<GuidesController>(GuidesController)
    guidesService = module.get<GuidesService>(GuidesService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  describe("Create guide", () => {
    it("should create a simple guide", async () => {
      const guideMock = getGuideMock()
      const createGuideDto: CreateGuideDto = plainToInstance(CreateGuideDto, guideMock)
      const guideDto: GuideDto = plainToInstance(GuideDto, guideMock)
      const result: CreateGuideResponseDto = {
        data: guideDto,
        errors: null,
      }
      jest.spyOn(guidesService, "create").mockReturnValueOnce(Promise.resolve(guideDto))

      const createResult = await controller.create(createGuideDto)

      expect(createResult).toEqual(result)
    })

    it("should handle bad input data", async () => {
      const createGuideDto: CreateGuideDto = plainToInstance(CreateGuideDto, {
        name: "",
        text: "",
      })

      const errorResult = await controller.create(createGuideDto)

      expect(errorResult.errors).toHaveLength(1)
    })

    it("should handle guide creation error", async () => {
      const guideMock = getGuideMock()
      const createGuideDto: CreateGuideDto = plainToInstance(CreateGuideDto, guideMock)
      const expectedError = new Error("Test error")
      jest.spyOn(guidesService, "create").mockRejectedValueOnce(expectedError)

      const errorResult = await controller.create(createGuideDto)

      expect(errorResult.errors).toHaveLength(1)
    })
  })
})
