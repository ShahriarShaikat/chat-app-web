import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/apiCommonResponse";
import type { PaginatedUsers, UserListParams } from "./user-types";

export const getPaginatedUsers = async (
  params: UserListParams,
): Promise<ApiResponse<PaginatedUsers>> => {
  const { data } = await api.get("/users/all", {
    params,
  });

  return data;
};

// export const getConversation = async (
//   conversationId: number,
// ): Promise<ApiResponse<Conversation>> => {
//   const { data } = await api.get(`/conversations/${conversationId}`);

//   return data;
// };

// export const createDirectConversation = async (
//   data: CreateDirectConversationDto,
// ): Promise<ApiResponse<Conversation>> => {
//   const { data: response } = await api.post("/conversations/direct", data);

//   return response;
// };

// export const createGroupConversation = async (
//   data: CreateGroupConversationDto,
// ): Promise<ApiResponse<Conversation>> => {
//   const { data: response } = await api.post("/conversations/group", data);

//   return response;
// };
