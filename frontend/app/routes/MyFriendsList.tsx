import Title from "~/utils/Title";
import type { Route } from "../+types/root";
import MyFriendsListPage from "~/pages/MyFriendsListPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: Title.title,
      description: Title.description,
      content: Title.content,
    },
  ];
}

export default function MyFriendsList() {
  return <MyFriendsListPage />;
}
