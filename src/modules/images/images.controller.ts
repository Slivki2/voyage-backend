import {
  Controller,
  Delete,
  FileTypeValidator,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common"
import { FilesInterceptor } from "@nestjs/platform-express"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_EXTENSIONS_REGEX,
  MAX_FILE_SIZE,
  MAX_FILES_PER_REQUEST,
} from "../common/constants"
import { DeleteImageResponse } from "./dto/delete-image-response"
import { UploadImagesDto } from "./dto/upload-images.dto"
import { UploadImagesResponse } from "./dto/upload-images-response"
import { ImagesService } from "./images.service"

@ApiTags("images")
@Controller("images")
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Upload images",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiCreatedResponse({
    description: "The images have been successfully uploaded.",
    type: UploadImagesResponse,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiPayloadTooLargeResponse({
    description: "The payload is too large.",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: `List of files to upload. Supported images formats: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`,
    schema: {
      type: "object",
      properties: {
        file: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor("file", MAX_FILES_PER_REQUEST, {
      limits: {
        files: MAX_FILES_PER_REQUEST,
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE, message: "File size is too large" }),
          new FileTypeValidator({
            fileType: ALLOWED_IMAGE_EXTENSIONS_REGEX,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<UploadImagesResponse> {
    const uploadImagesDto: UploadImagesDto = {
      files: files,
    }

    const result = await this.imagesService.upload(uploadImagesDto)

    return {
      data: result,
      errors: null,
    }
  }

  @Delete(":url")
  @ApiOperation({ summary: "Remove an image by url" })
  @ApiParam({ name: "url", type: String })
  @ApiOkResponse({
    description: "The image has been successfully removed.",
    type: DeleteImageResponse,
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  @ApiNotFoundResponse({
    description: "Image not found",
  })
  async deleteImage(@Param("url") url: string): Promise<DeleteImageResponse> {
    const results = await this.imagesService.delete([url])

    return {
      data: results,
      errors: null,
    }
  }
}
