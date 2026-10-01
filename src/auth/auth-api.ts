import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/apiCommonResponse";
import type { LoginResponse, RefreshApiResponse, User } from "@/types/auth";

export async function login(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", {
    email,
    password,
  });

  return data;
}

export async function refreshAccessToken(): Promise<
  ApiResponse<RefreshApiResponse>
> {
  const { data } =
    await api.post<ApiResponse<RefreshApiResponse>>("/auth/refresh");
  return data;
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  const { data } = await api.get<ApiResponse<User>>("/users/me");
  return data;
}

export async function logout(): Promise<ApiResponse<{ message: string }>> {
  const { data } =
    await api.post<ApiResponse<{ message: string }>>("/auth/logout");
  return data;
}
