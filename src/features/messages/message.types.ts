export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
  updatedAt: string;

  sender: {
    id: number;
    name: string | null;
    email: string;
  };
}

export interface SendMessagePayload {
  conversationId: number;
  content: string;
}

export interface SendMessageAck {
  success: boolean;
  data?: Message;
  message?: string;
}
