import { useInfiniteQuery } from "@tanstack/react-query";
import { messageKeys } from "./message-keys";
import { getMessages } from "./messages-api";

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
