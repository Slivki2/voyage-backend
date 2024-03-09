import { ImageUploadResult, PutObjectCommandOutputExtended } from "./types"

export function toImageUploadSuccessResult(s3UploadResult: PutObjectCommandOutputExtended): ImageUploadResult {
  return {
    key: s3UploadResult.Key,
    url: s3UploadResult.Location,
    error: null,
  }
}

export function toImageUploadErrorResult(): ImageUploadResult {
  return {
    key: null,
    url: null,
    error: new Error("Failed to upload image to S3."),
  }
}
