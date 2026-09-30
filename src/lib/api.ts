import axios from "axios";

import { getAccessToken, setAccessToken } from "@/auth/token-store";

import { refreshAccessToken } from "@/auth/auth-api";
import { notifyAuthFailure } from "@/auth/auth-events";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Prevent multiple simultaneous refresh requests
let refreshPromise: Promise<string> | null = null;

async function refresh() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const refreshTokenRes = await refreshAccessToken();

        if (refreshTokenRes.success && refreshTokenRes.payload) {
          setAccessToken(refreshTokenRes.payload.accessToken);
          return refreshTokenRes.payload.accessToken;
        }

        throw new Error("Failed to refresh access token");
      } catch (error) {
        console.log("🚀 ~ refresh ~ error:", error);
        throw error;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

// Handle expired access tokens
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url === "/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const token = await refresh();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      notifyAuthFailure();
      return Promise.reject(refreshError);
    }
  },
);
