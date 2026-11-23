import { socket } from "@/lib/socket";
import type { ApiResponse } from "@/types/apiCommonResponse";
import type { Message, MessagesResponse } from "@/types/message.types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { messageKeys } from "./message-keys";
import { getMessages, sendMessage } from "./messages-api";

export function useRealtimeMessages(conversationId: number | null) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (conversationId === null) return;

    const joinConversation = () => {
      socket.emit("conversation:join", { conversationId });
    };

    const handleNewMessage = (message: Message) => {
      // Ignore messages from other conversations.
      if (message.conversationId !== conversationId) return;

      queryClient.setQueryData<
        InfiniteData<ApiResponse<MessagesResponse>, string | undefined>
      >(messageKeys.conversation(conversationId), (oldData) => {
        // If messages haven't loaded yet, fetch them normally.
        if (!oldData?.pages.length) {
          queryClient.invalidateQueries({
            queryKey: messageKeys.conversation(conversationId),
          });

          return oldData;
        }

        // Prevent duplicate messages.
        const alreadyExists = oldData.pages.some((page) =>
          page.payload.data.some((item) => item.id === message.id),
        );

        if (alreadyExists) return oldData;

        // First page contains the newest messages.
        const pages = [...oldData.pages];

        pages[0] = {
          ...pages[0],
          payload: {
            ...pages[0].payload,
            data: [message, ...pages[0].payload.data],
          },
        };

        return {
          ...oldData,
          pages,
        };
      });

      // Refresh the conversation sidebar.
      // queryClient.invalidateQueries({
      //   queryKey: ["conversations", "list"],
      // });
    };

    // Join when connected, and rejoin after reconnection.
    if (socket.connected) {
      joinConversation();
    }

    socket.on("connect", joinConversation);
    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("connect", joinConversation);
      socket.off("message:new", handleNewMessage);

      if (socket.connected) {
        socket.emit("conversation:leave", { conversationId });
      }
    };
  }, [conversationId, queryClient]);
}

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
