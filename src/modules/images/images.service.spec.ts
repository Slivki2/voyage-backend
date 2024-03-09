import { Test, TestingModule } from "@nestjs/testing"
import { MockedLogger } from "../../test-utils/providers"
import { AwsS3Service } from "../aws-s3/aws-s3.service"
import { ImagesController } from "./images.controller"
import { ImagesService } from "./images.service"

describe("ImagesService", () => {
  let service: ImagesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService, MockedLogger],
    })
      .useMocker(token => {
        if (token === AwsS3Service) {
          return {
            upload: jest.fn(),
            delete: jest.fn(),
          }
        }
      })
      .compile()

    service = module.get<ImagesService>(ImagesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
