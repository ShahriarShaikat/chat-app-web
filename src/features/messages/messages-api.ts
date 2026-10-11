import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/apiCommonResponse";
import type { MessagesResponse } from "@/types/message.types";

interface GetMessagesParams {
  conversationId: number;
  cursor?: string;
}

export async function getMessages({
  conversationId,
  cursor,
}: GetMessagesParams): Promise<ApiResponse<MessagesResponse>> {
  const response = await api.get(`/conversations/${conversationId}/messages`, {
    params: {
      cursor,
    },
  });

  return response.data;
}
