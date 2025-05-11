import type { Route } from "../+types/root";
import UpdatePage from "~/pages/components/UpdatePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ登録" },
  ];
}

export default function Update() {
  return <UpdatePage />;
}
