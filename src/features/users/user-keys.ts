import type { UserListParams } from "./user-types";

export const userKeys = {
  all: ["users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  paginatedList: (params: UserListParams) =>
    [...userKeys.lists(), params] as const,

  // details: () => [...conversationKeys.all, "detail"] as const,

  // detail: (id: number) => [...conversationKeys.details(), id] as const,
};
