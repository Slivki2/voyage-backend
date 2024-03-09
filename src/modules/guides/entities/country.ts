import { Image } from "./image"

export class Country {
  id: string
  name: string

  images: Image[]

  createdAt: Date
  updatedAt: Date
}
