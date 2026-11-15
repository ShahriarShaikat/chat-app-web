import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { socket } from "@/lib/socket";

export function ChatSocketConnection() {
  const { accessToken, status } = useAuth();

  useEffect(() => {
    if (status !== "authenticated" || !accessToken) {
      socket.disconnect();
      return;
    }

    // Supply the latest access token for the handshake.
    socket.auth = {
      accessToken,
    };

    // Reconnect if the token has changed.
    if (socket.connected) {
      socket.disconnect();
    }

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [accessToken, status]);

  return null;
}
