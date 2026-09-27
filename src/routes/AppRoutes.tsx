import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ChatPage from "@/pages/chat/ChatPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegistrationPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/chat" element={<ChatPage />} />

        <Route path="/" element={<Navigate to="/chat" replace />} />

        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
