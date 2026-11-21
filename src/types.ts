export type View =
  | "landing"
  | "auth"
  | "dashboard"
  | "explore"
  | "requests"
  | "messages"
  | "chat"
  | "profile"
  | "notifications"
  | "settings";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatarColor: string;
  bio: string;
  location: string;
  interests: string[];
  online: boolean;
  verified: boolean;
  joinedAt: string;
  isPrivate: boolean;
  showOnline: boolean;
}

export interface ChatRequest {
  id: string;
  fromId: string;
  toId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Conversation {
  id: string;
  memberIds: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Block {
  id: string;
  blockerId: string;
  blockedId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  reason: string;
  status: "pending" | "resolved";
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "request" | "accepted" | "rejected" | "message";
  text: string;
  read: boolean;
  createdAt: string;
}

export interface AppState {
  users: User[];
  currentUserId: string | null;
  requests: ChatRequest[];
  conversations: Conversation[];
  messages: Message[];
  blocks: Block[];
  reports: Report[];
  notifications: Notification[];
}