export type ConversationType = "DIRECT" | "GROUP";

export interface ConversationUser {
  id: number;
  name: string | null;
  email: string;
}

export interface Conversation {
  id: number;
  type: ConversationType;
  name: string | null;
  createdAt: string;
  updatedAt: string;

  members: ConversationMember[];
}

export interface ConversationMember {
  userId: number;
  joinedAt: string;
  user: ConversationUser;
}

export interface ConversationListParams {
  search?: string;
  type?: ConversationType;
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface CreateDirectConversationDto {
  userId: number;
}

export interface CreateGroupConversationDto {
  name: string;
  memberIds: number[];
}
