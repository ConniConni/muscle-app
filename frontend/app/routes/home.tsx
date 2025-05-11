import { Top } from "~/pages/Top";
import type { Route } from "./+types/home";
import Title from "~/utils/Title";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: Title.title,
      description: Title.description,
      content: Title.content,
    },
  ];
}

export default function Home() {
  return <Top />;
}
