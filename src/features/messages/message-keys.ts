export const messageKeys = {
  all: ["messages"] as const,

  conversation: (conversationId: number | null) =>
    [...messageKeys.all, "conversation", conversationId] as const,
};

// export const messageKeys = {
//   all: ["messages"] as const,

//   lists: () => [...messageKeys.all, "list"] as const,

//   list: (conversationId: number | null) =>
//     [...messageKeys.lists(), conversationId] as const,
// };
