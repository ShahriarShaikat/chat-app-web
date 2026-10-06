import type { ConversationListParams } from "@/types/conversation.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversations } from "./conversation-api";
import { conversationKeys } from "./conversation-keys";

// export const useConversations = (params: ConversationListParams = {}) => {
//   return useInfiniteQuery({
//     queryKey: conversationKeys.list(params),
//     queryFn: () => getConversations(params),
//   });
// };

export const useConversations = (params: ConversationListParams = {}) => {
  const { page = 1, limit = 20, ...filters } = params;

  return useInfiniteQuery({
    queryKey: conversationKeys.list({
      ...filters,
      limit,
    }),

    queryFn: ({ pageParam }) =>
      getConversations({
        ...filters,
        page: pageParam,
        limit,
      }),

    initialPageParam: page,

    getNextPageParam: (lastPage) => {
      if (lastPage.payload.meta.page >= lastPage.payload.meta.totalPages) {
        return undefined;
      }

      return lastPage.payload.meta.page + 1;
    },
  });
};
