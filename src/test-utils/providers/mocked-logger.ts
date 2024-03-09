import { Logger, Provider } from "@nestjs/common"

export const MockedLogger: Provider = {
  provide: Logger,
  useValue: {
    error: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  },
}
