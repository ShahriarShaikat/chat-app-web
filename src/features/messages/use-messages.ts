import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { messageKeys } from "./message-keys";
import { getMessages, sendMessage } from "./messages-api";

export function useMessages(conversationId: number | null) {
  return useInfiniteQuery({
    queryKey: messageKeys.conversation(conversationId),

    queryFn: ({ pageParam }) => {
      if (conversationId === null) {
        throw new Error("Conversation ID is required");
      }

      return getMessages({
        conversationId,
        cursor: pageParam,
      });
    },

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) =>
      lastPage.payload.meta.hasNextPage
        ? (lastPage.payload.meta.nextCursor ?? undefined)
        : undefined,

    enabled: conversationId !== null,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      payload,
    }: {
      conversationId: number;
      payload: { content: string };
    }) => sendMessage(conversationId, payload),

    onSuccess: async (_message, variables) => {
      await queryClient.invalidateQueries({
        queryKey: messageKeys.conversation(variables.conversationId),
      });

      // Refresh conversation previews, including last-message content
      // and ordering in the sidebar.
      await queryClient.invalidateQueries({
        queryKey: ["conversations", "list"],
      });
    },
  });
}
