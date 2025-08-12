import Title from "~/utils/Title";
import type { Route } from "../+types/root";
import UserSearchPage from "~/pages/UserSearchPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: Title.title,
      description: Title.description,
      content: Title.content,
    },
  ];
}

export default function UserSearch() {
  return <UserSearchPage />;
}
