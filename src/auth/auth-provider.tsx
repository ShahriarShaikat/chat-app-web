import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  getCurrentUser,
  logout as logoutApi,
  refreshAccessToken,
} from "./auth-api";

import { setAccessToken } from "./token-store";

import type { User } from "@/types/auth";
import { AuthContext, type AuthContextValue } from "./auth-context";
import { setAuthFailureHandler } from "./auth-events";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");
  const hasFetched = useRef(false);

  const invokeLogin = useCallback(async (accessToken: string) => {
    // const loginResponse = await loginApi(email, password);

    // if (loginResponse.success && loginResponse?.payload) {

    // }

    setAccessToken(accessToken);
    setAccessTokenState(accessToken);
    const currentUserRes = await getCurrentUser();
    if (currentUserRes.success && currentUserRes.payload) {
      setUser(currentUserRes.payload);
      setStatus("authenticated");
    }
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
        const refreshApiRes = await refreshAccessToken();

        if (refreshApiRes?.payload && refreshApiRes.payload.accessToken) {
          setAccessToken(refreshApiRes.payload.accessToken);
          setAccessTokenState(refreshApiRes.payload.accessToken);

          const currentUserRes = await getCurrentUser();

          if (currentUserRes.success && currentUserRes.payload) {
            setUser(currentUserRes.payload);
            setStatus("authenticated");
          }
        }
      } catch {
        setAccessToken(null);
        setAccessTokenState(null);
        setUser(null);
        setStatus("unauthenticated");
      }
    }

    if (hasFetched.current) return;
    hasFetched.current = true;
    initialize();

    // 3. Return a cleanup function to abort the request on unmount
  }, []);

  const value = useMemo(
    () => ({
      accessToken: accessTokenState,
      user,
      status,
      invokeLogin,
      logout,
    }),
    [accessTokenState, user, status, invokeLogin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
