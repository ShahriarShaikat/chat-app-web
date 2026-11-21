import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { PublicRoute } from "@/auth/PublicRoute";
import LoginPage from "@/pages/auth/LoginPage";
import OAuthCallback from "@/pages/auth/OAuthCallback";
import RegisterPage from "@/pages/auth/RegistrationPage";
import ChatPage from "@/pages/chat/ChatPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<OAuthCallback />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/chat" replace />} />

        {/* <Route path="*" element={<Navigate to="/chat" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
