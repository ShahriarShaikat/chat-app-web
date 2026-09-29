import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { status, user } = useAuth();
  console.log("🚀 ~ ProtectedRoute ~ user:", user);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  // if (status === "authenticated") {
  //   return <Navigate to="/chat" replace />;
  // }

  return children;
}
