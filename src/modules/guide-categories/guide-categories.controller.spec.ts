import { Test, TestingModule } from "@nestjs/testing"
import { getGuideCategoryDtoMock } from "../../test-utils/mocks/guide-category"
import { MockedLogger } from "../../test-utils/providers"
import { PrismaModule } from "../prisma/prisma.module"
import { GuideCategoriesController } from "./guide-categories.controller"
import { GuideCategoriesService } from "./guide-categories.service"

describe("GuideCategoriesController", () => {
  let controller: GuideCategoriesController
  let guideCategoriesService: GuideCategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [GuideCategoriesController],
      providers: [GuideCategoriesService, MockedLogger],
    }).compile()

    controller = module.get<GuideCategoriesController>(GuideCategoriesController)
    guideCategoriesService = module.get<GuideCategoriesService>(GuideCategoriesService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  describe("Get all guide categories", () => {
    it("should return an empty array", async () => {
      jest.spyOn(guideCategoriesService, "findAll").mockReturnValueOnce(Promise.resolve([]))

      const result = await controller.findAll()

      expect(result.data).toEqual([])
    })

    it("should return an error", async () => {
      const error = new Error("Test error")
      jest.spyOn(guideCategoriesService, "findAll").mockRejectedValueOnce(error)

      const result = await controller.findAll()

      expect(result.errors).toHaveLength(1)
    })

    it("should return guide categories", async () => {
      const guideCategoryMock = getGuideCategoryDtoMock()
      jest.spyOn(guideCategoriesService, "findAll").mockReturnValueOnce(Promise.resolve([guideCategoryMock]))

      const result = await controller.findAll()

      expect(result.data).toEqual([guideCategoryMock])
    })
  })
})
