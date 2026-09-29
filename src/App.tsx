import AppRoutes from "@/routes/AppRoutes";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./auth/auth-provider";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <SnackbarProvider />
    </AuthProvider>
  );
}

export default App;
