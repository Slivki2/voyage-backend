import { DeleteObjectOutput } from "@aws-sdk/client-s3"
import { createHash } from "crypto"
import { FileDeleteResult, FileUploadResult, PutObjectCommandOutputExtended } from "./types"

export function toFileUploadSuccessResult(s3UploadResult: PutObjectCommandOutputExtended): FileUploadResult {
  return {
    key: s3UploadResult.Key,
    url: s3UploadResult.Location,
    error: null,
  }
}

export function toFileUploadErrorResult(): FileUploadResult {
  return {
    key: null,
    url: null,
    error: new Error("Failed to upload image to S3."),
  }
}

export function toFileDeleteSuccessResult(s3DeleteResult: DeleteObjectOutput): FileDeleteResult {
  return {
    key: null,
    url: null,
    deleted: true,
    error: null,
  }
}

export function toFileDeleteErrorResult(): FileDeleteResult {
  return {
    key: null,
    url: null,
    deleted: false,
    error: new Error("Failed to delete image from S3."),
  }
}

export function generateS3ObjectKeyFromFilename(filename: string) {
  const hash = createHash("sha256").update(filename, "utf-8").digest("hex")

  return hash
}

export function getS3ObjectKeyFromUrl(s3ObjectUrl: string) {
  const url = new URL(s3ObjectUrl)

  // NOTE: Remove the first slash
  const objectKey = url.pathname.substring(1)

  return objectKey
}
