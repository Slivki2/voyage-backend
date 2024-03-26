import { ApiError } from "./api-error"

export type ApiResponse<TData> = {
  data: TData | null
  errors: ApiError[] | null
}
