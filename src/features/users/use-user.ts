import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedUsers } from "./user-api";
import { userKeys } from "./user-keys";
import type { UserListParams } from "./user-types";

export const usePaginatedUsers = (params: UserListParams = {}) => {
  const { page = 1, limit = 10, ...filters } = params;

  return useInfiniteQuery({
    queryKey: userKeys.paginatedList({
      ...filters,
      limit,
    }),

    queryFn: ({ pageParam }) =>
      getPaginatedUsers({
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
