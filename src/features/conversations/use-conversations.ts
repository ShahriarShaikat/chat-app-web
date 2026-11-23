import { socket } from "@/lib/socket";
import type {
  ConversationListParams,
  CreateDirectConversationDto,
} from "@/types/conversation.types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import {
  createDirectConversation,
  getConversation,
  getConversations,
} from "./conversation-api";
import { conversationKeys } from "./conversation-keys";

export function useRealtimeConversations() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const invalidateConversationList = () => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.lists(),
      });
    };

    socket.on("conversation:created", invalidateConversationList);
    socket.on("conversation:updated", invalidateConversationList);

    return () => {
      socket.off("conversation:created", invalidateConversationList);
      socket.off("conversation:updated", invalidateConversationList);
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

export function useCreateDirectConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDirectConversationDto) =>
      createDirectConversation(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: conversationKeys.lists(),
      });
    },
  });
}
