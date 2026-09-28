import { api } from "@/lib/api";
import type { User } from "@/types/auth";

interface LoginResponse {
  accessToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data;
}

export async function refreshAccessToken(): Promise<string> {
  const { data } = await api.post<RefreshResponse>("/auth/refresh");

  return data.accessToken;
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<User>("/users/me");

  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}
