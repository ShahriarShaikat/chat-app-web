import { socket } from "@/lib/socket";
import type { ConversationListParams } from "@/types/conversation.types";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { getConversation, getConversations } from "./conversation-api";
import { conversationKeys } from "./conversation-keys";

// export const useConversations = (params: ConversationListParams = {}) => {
//   return useInfiniteQuery({
//     queryKey: conversationKeys.list(params),
//     queryFn: () => getConversations(params),
//   });
// };

export function useRealtimeConversations() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleConversationCreated = () => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.lists(),
      });
    };

    socket.on("conversation:created", handleConversationCreated);

    return () => {
      socket.off("conversation:created", handleConversationCreated);
    };
  }, [queryClient]);
}

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

export const useConversation = (conversationId: number | null) => {
  return useQuery({
    queryKey: conversationKeys.detail(conversationId!),
    queryFn: () => {
      if (conversationId === null) {
        throw new Error("Conversation ID is required");
      }
      return getConversation(conversationId!);
    },
    enabled: !!conversationId,
  });
};
