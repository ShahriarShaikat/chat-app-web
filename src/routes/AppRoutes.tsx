import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { PublicRoute } from "@/auth/PublicRoute";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegistrationPage";
import ChatPage from "@/pages/chat/ChatPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
