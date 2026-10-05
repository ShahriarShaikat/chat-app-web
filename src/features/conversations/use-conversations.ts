import type { ConversationListParams } from "@/types/conversation.types";
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "./conversation-api";
import { conversationKeys } from "./conversation-keys";

export const useConversations = (params: ConversationListParams = {}) => {
  return useQuery({
    queryKey: conversationKeys.list(params),
    queryFn: () => getConversations(params),
  });
};
