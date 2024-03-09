import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

export const MockedConfigService: Provider = {
  provide: ConfigService,
  useValue: {
    get: jest.fn(() => ({
      region: "region",
      accessKeyId: "accessKeyId",
      secretAccessKey: "secretAccessKey",
    })),
  },
}
