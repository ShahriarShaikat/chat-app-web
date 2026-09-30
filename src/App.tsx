import AppRoutes from "@/routes/AppRoutes";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { AuthProvider } from "./auth/auth-provider";

function App() {
  useEffect(() => {
    // Shared utility classes keep the visual language consistent across the small UI primitives.
    const styles = `
.field { width: 100%; height: 2.75rem; border: 1px solid hsl(var(--border)); border-radius: .75rem; background: hsl(var(--card)); padding: 0 .875rem; font-size: .875rem; outline: none; transition: box-shadow .15s, border-color .15s; }
.field:focus { border-color: #6253d9; box-shadow: 0 0 0 3px rgba(98,83,217,.12); }
.icon-button { display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: .7rem; color: hsl(var(--muted-foreground)); transition: background .15s, color .15s; }
.icon-button:hover { background: hsl(var(--muted)); color: hsl(var(--foreground)); }
.icon-button svg { width: 1rem; height: 1rem; }
.detail-action { display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: .7rem; border: 1px solid hsl(var(--border)); color: hsl(var(--muted-foreground)); }
.detail-action:hover { background: hsl(var(--muted)); color: hsl(var(--foreground)); }
.detail-action svg { width: 1rem; height: 1rem; }
.detail-row { display: flex; align-items: center; gap: .65rem; border-radius: .7rem; padding: .65rem; font-size: .75rem; color: hsl(var(--muted-foreground)); text-align: left; }
.detail-row:hover { background: hsl(var(--muted)); color: hsl(var(--foreground)); }
.detail-row svg { width: 1rem; height: 1rem; }
`;

    if (
      typeof document !== "undefined" &&
      !document.getElementById("luma-styles")
    ) {
      const style = document.createElement("style");
      style.id = "luma-styles";
      style.textContent = styles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <SnackbarProvider />
    </AuthProvider>
  );
}

export default App;
