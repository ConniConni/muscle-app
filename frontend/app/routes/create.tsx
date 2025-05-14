import PostTrainingDataPage from "~/pages/components/postTrainingDataPage";
import type { Route } from "../+types/root";
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

export default function Create() {
  return <PostTrainingDataPage />;
}
