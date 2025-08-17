export type User = {
  id: number;
  username: string;
};

export type Friend = {
  id: number;
  username: string;
};

export type FriendshipStatus = "PENDING" | "ACCEPTED" | null;

export type UserWithFriendshipStatus = User & {
  friendshipStatus: FriendshipStatus;
};
