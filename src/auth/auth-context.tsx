import type { User } from "@/types/auth";
import { createContext } from "react";

export interface AuthContextValue {
  accessToken: string | null;
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";

  invokeLogin: (accessToken: string) => Promise<void>;

  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
