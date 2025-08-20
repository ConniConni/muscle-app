export type User = {
  id: number;
  userId: string;
  username: string;
};

export type Friend = {
  id: number;
  username: string;
};

export type FriendshipStatus = "PENDING" | "ACCEPTED" | "NONE";

export type UserWithFriendshipStatus = User & {
  friendshipStatus: FriendshipStatus;
};
