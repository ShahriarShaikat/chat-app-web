export const messageKeys = {
  all: ["messages"] as const,

  conversation: (conversationId: number | null) =>
    [...messageKeys.all, "conversation", conversationId] as const,
};
