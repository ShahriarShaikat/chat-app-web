export interface ApiResponse<T> {
  success: boolean;
  payload: T;
  statusCode: number;
}
