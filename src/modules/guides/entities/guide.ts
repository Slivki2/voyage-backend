import { ApiProperty } from "@nestjs/swagger"

export class Guide {
  @ApiProperty({
    type: String,
    description: "The id of the guide",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  id: string

  @ApiProperty({
    type: String,
    description: "The name of the guide",
    example: "Travel Guide to Paris",
  })
  name: string

  @ApiProperty({
    type: String,
    description: "The content of the guide",
    example: "Paris is the capital city of France",
  })
  text: string

  @ApiProperty({
    type: Date,
    description: "The date the guide was created",
    example: "2021-08-01T00:00:00.000Z",
  })
  createdAt: Date

  @ApiProperty({
    type: Date,
    description: "The date the guide was last updated",
    example: "2021-08-01T00:00:00.000Z",
  })
  updatedAt: Date
}
