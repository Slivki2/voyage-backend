import { Image } from "./image"

export class City {
  id: string
  name: string
  country: string

  images: Image[]

  createdAt: Date
  updatedAt: Date
}
