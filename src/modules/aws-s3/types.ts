import { PutObjectCommandOutput } from "@aws-sdk/client-s3"

export type PutObjectCommandOutputExtended = PutObjectCommandOutput & {
  // NOTE: AWS S3 object key
  Key: string
  // NOTE: AWS S3 URL to get the object
  Location: string
}

export class ImageUploadResult {
  key: string | null
  url: string | null
  error: Error | null
}
