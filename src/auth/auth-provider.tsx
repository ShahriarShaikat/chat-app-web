import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from "./auth-api";

import { setAccessToken } from "./token-store";

import { api } from "@/lib/api";
import type { User } from "@/types/auth";
import { AuthContext, type AuthContextValue } from "./auth-context";
import { setAuthFailureHandler } from "./auth-events";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginApi(email, password);

    setAccessToken(response.accessToken);
    setAccessTokenState(response.accessToken);

    const currentUser = await getCurrentUser();

    setUser(currentUser);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      setAccessToken(null);
      setAccessTokenState(null);
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    setAuthFailureHandler(() => {
      setAccessToken(null);
      setAccessTokenState(null);
      setUser(null);
      setStatus("unauthenticated");
    });

    return () => {
      setAuthFailureHandler(() => {});
    };
  }, []);

  useEffect(() => {
    async function initialize() {
      try {
        // We don't need to manually call /refresh here.
        // We can use the API directly.
        const response = await api.post<{ accessToken: string }>(
          "/auth/refresh",
        );

        setAccessToken(response.data.accessToken);
        setAccessTokenState(response.data.accessToken);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
        setStatus("authenticated");
      } catch {
        setAccessToken(null);
        setAccessTokenState(null);
        setUser(null);
        setStatus("unauthenticated");
      }
    }

    initialize();
  }, []);

  const value = useMemo(
    () => ({
      accessToken: accessTokenState,
      user,
      status,
      login,
      logout,
    }),
    [accessTokenState, user, status, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
