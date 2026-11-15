import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;

const socketOrigin = new URL(apiUrl).origin;

export const socket = io(`${socketOrigin}/chat`, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket", "polling"],
});
