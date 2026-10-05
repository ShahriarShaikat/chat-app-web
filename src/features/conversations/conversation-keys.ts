// features/conversations/api/conversation-keys.ts

import type { ConversationListParams } from "@/types/conversation.types";

export const conversationKeys = {
  all: ["conversations"] as const,

  lists: () => [...conversationKeys.all, "list"] as const,

  list: (params: ConversationListParams) =>
    [...conversationKeys.lists(), params] as const,

  details: () => [...conversationKeys.all, "detail"] as const,

  detail: (id: number) => [...conversationKeys.details(), id] as const,
};
