import { ApiError } from "./api-error"

export type ApiResponse<TData> = {
  data: TData
  errors: ApiError[] | null
}
