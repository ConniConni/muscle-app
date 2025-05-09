import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ記録更新" },
  ];
}

export default function Create() {
  return <h1>テスト</h1>;
}
