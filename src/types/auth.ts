export interface User {
  userId: number;
  email: string;
  role: "USER" | "ADMIN";
}

export interface RefreshApiResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
  };
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
}
