import { Top } from "~/pages/Top";
import type { Route } from "./+types/home";
import { BrowserRouter, Routes, Route as ReactRoute } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ管理" },
  ];
}

export default function Home() {
  return (
    <h1>テスト</h1>
    // <BrowserRouter>
    //   <Routes>
    //     <ReactRoute index element={<Top />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
