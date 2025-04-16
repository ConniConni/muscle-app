import { Top } from "~/pages/Top";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ管理" },
  ];
}

export default function Home() {
  return <Top />;
}
