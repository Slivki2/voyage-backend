import { ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { MockedConfigService } from "../../test-utils/providers"
import { MockedLogger } from "../../test-utils/providers"
import { AwsS3Service } from "./aws-s3.service"

describe("AwsS3Service", () => {
  let service: AwsS3Service
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsS3Service, MockedConfigService, MockedLogger],
    }).compile()

    service = module.get<AwsS3Service>(AwsS3Service)
    configService = module.get<ConfigService>(ConfigService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
