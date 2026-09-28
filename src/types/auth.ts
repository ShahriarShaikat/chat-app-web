export interface User {
  id: number;
  name: string | null;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
}
