export type User = {
  id: number;
  userId: string;
  username: string;
};

export type FriendRequest = {
  id: number;
  requester: {
    id: number;
    username: string;
  };
};

export type FriendshipStatus = "PENDING" | "ACCEPTED" | "NONE";

export type UserWithFriendshipStatus = User & {
  friendshipStatus: FriendshipStatus;
};
