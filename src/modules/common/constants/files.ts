export const MAX_FILES_PER_REQUEST = 5

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const ALLOWED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"] as const
export const ALLOWED_IMAGE_EXTENSIONS_REGEX = new RegExp(`^.*\.(${ALLOWED_IMAGE_EXTENSIONS.join("|")})$`, "i")
export const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"] as const
