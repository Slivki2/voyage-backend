import { Logger, Module } from "@nestjs/common"
import { AwsS3Module } from "../aws-s3/aws-s3.module"
import { ImagesController } from "./images.controller"
import { ImagesService } from "./images.service"

@Module({
  imports: [AwsS3Module],
  controllers: [ImagesController],
  providers: [ImagesService, Logger],
})
export class ImagesModule {}
