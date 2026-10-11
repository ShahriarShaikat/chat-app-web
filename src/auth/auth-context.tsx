import type { User } from "@/types/auth";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface AuthContextValue {
  accessToken: string | null;
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";

  selectedConversationId: number | null;
  setSelectedConversationId: Dispatch<SetStateAction<number | null>>;

  invokeLogin: (accessToken: string) => Promise<void>;
  invokeLogout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
