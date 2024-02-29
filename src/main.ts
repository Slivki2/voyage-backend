import { INestApplication } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"
import * as cookieParser from "cookie-parser"
import { isProdEnv } from "./config/env/utils"
import { AppModule } from "./modules/app/app.module"
import { getLoggerInstance } from "./config/logger"
import { generateSwaggerConfig, SWAGGER_API_URL } from "./config/swagger-config"
import { EnvironmentConfig } from "./config/env/env-configuration"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerInstance(),
  })

  setupSwagger(app)

  app.use(cookieParser())

  const configService = app.get<ConfigService<EnvironmentConfig>>(ConfigService)
  const appPort = configService.get<number>("app_port")

  await app.listen(appPort, () => {
    console.log(`Server is running on ${appPort} port!`)
  })
}

function setupSwagger(app: INestApplication) {
  if (isProdEnv()) {
    return
  }

  const swaggerConfig = generateSwaggerConfig()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(SWAGGER_API_URL, app, swaggerDocument)
}

bootstrap()
