import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/apiCommonResponse";
import type { Message, MessagesResponse } from "@/types/message.types";

interface GetMessagesParams {
  conversationId: number;
  cursor?: string;
}

export async function sendMessage(
  conversationId: number,
  body: { content: string },
): Promise<Message> {
  const response = await api.post(
    `/conversations/${conversationId}/messages`,
    body,
  );

  return response.data;
}

export async function getMessages({
  conversationId,
  cursor,
}: GetMessagesParams): Promise<ApiResponse<MessagesResponse>> {
  const response = await api.get(`/conversations/${conversationId}/messages`, {
    params: {
      cursor,
      limit: 10,
    },
  });

  return response.data;
}
