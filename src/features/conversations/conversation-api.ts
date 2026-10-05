import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/apiCommonResponse";
import type {
  Conversation,
  ConversationListParams,
  CreateDirectConversationDto,
  CreateGroupConversationDto,
} from "@/types/conversation.types";

export interface PaginatedConversations {
  data: Conversation[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getConversations = async (
  params: ConversationListParams,
): Promise<ApiResponse<PaginatedConversations>> => {
  const { data } = await api.get("/conversations", {
    params,
  });

  return data;
};

export const getConversation = async (
  conversationId: number,
): Promise<ApiResponse<Conversation>> => {
  const { data } = await api.get(`/conversations/${conversationId}`);

  return data;
};

export const createDirectConversation = async (
  data: CreateDirectConversationDto,
): Promise<ApiResponse<Conversation>> => {
  const { data: response } = await api.post("/conversations/direct", data);

  return response;
};

export const createGroupConversation = async (
  data: CreateGroupConversationDto,
): Promise<ApiResponse<Conversation>> => {
  const { data: response } = await api.post("/conversations/group", data);

  return response;
};
