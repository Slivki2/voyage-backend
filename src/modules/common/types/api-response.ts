export type ApiResponse<TData> = {
  data: TData
  errors: Error[] | null
}
