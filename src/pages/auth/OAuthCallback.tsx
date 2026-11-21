import { refreshAccessToken } from "@/auth/auth-api";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();
  const { invokeLogin } = useAuth();

  useEffect(() => {
    let active = true;

    const completeLogin = async () => {
      try {
        const refreshTokenRes = await refreshAccessToken();

        if (!active) return;

        if (refreshTokenRes.success && refreshTokenRes.payload) {
          // Adjust this according to your API response envelope.
          invokeLogin(refreshTokenRes.payload.accessToken);
        }

        navigate("/chat", { replace: true });
      } catch {
        if (active) {
          navigate("/login?error=oauth_failed", {
            replace: true,
          });
        }
      }
    };

    completeLogin();

    return () => {
      active = false;
    };
  }, [navigate, invokeLogin]);

  return <div>Completing your Google sign-in...</div>;
}

export default OAuthCallback;
