import { ApiProperty } from "@nestjs/swagger"

export class Image {
  @ApiProperty({
    type: String,
    description: "The id of the image",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  id: string

  @ApiProperty({
    type: String,
    description: "The url of the image",
    example: "https://example.com/image.jpg",
    required: true,
  })
  url: string

  @ApiProperty({
    type: String,
    description: "The alt text of the image",
    example: "A beautiful image",
    required: false,
  })
  alt: string

  @ApiProperty({
    type: String,
    description: "The type of the image",
    example: "png",
    required: true,
  })
  type: string
}
