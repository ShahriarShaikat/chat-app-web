export interface Message {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  sender: {
    id: number;
    email: string;
    name: string;
  };
}

export interface MessagesResponse {
  data: Message[];
  meta: {
    limit: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
}
