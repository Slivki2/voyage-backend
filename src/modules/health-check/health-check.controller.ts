import { Controller, Get } from "@nestjs/common"
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus"

@Controller("health-check")
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.httpHealthIndicator.pingCheck("server", "https://docs.nestjs.com"),
    ])
  }
}
