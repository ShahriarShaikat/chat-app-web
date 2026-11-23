export interface UserListParams {
  search?: string;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface PaginatedUsers {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}
