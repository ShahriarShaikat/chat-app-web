import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      navigate("/chat", { replace: true });
    } else {
      navigate("/login?error=oauth_failed", {
        replace: true,
      });
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <ShieldCheck className="h-9 w-9 text-slate-700" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900">
          Completing your Google sign-in
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please wait while we securely verify your account and prepare your
          session.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-600">
          <LoaderCircle className="h-5 w-5 animate-spin text-blue-500" />
          Connecting securely...
        </div>

        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-500" />
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-400">
          This may take a few moments on a slow connection. Please don't close
          this page.
        </p>
      </div>
    </div>
  );
}

export default OAuthCallback;
