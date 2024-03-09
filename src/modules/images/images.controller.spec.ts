import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { AwsS3Service } from "../aws-s3/aws-s3.service"
import { ImagesController } from "./images.controller"
import { ImagesService } from "./images.service"

describe("ImagesController", () => {
  let controller: ImagesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService, MockedLogger],
    })
      .useMocker(token => {
        if (token === AwsS3Service) {
          return {
            async uploadFiles(files: Express.Multer.File[]): Promise<unknown> {
              return null
            },
          }
        }
      })
      .compile()

    controller = module.get<ImagesController>(ImagesController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
