export type User = {
  id: number;
  userId: string;
  username: string;
};

export type Friend = {
  friendshipId: number;
  userId: number;
  username: string;
};

export type FriendshipStatus = "PENDING" | "ACCEPTED" | "NONE";

export type UserWithFriendshipStatus = User & {
  friendshipStatus: FriendshipStatus;
};
