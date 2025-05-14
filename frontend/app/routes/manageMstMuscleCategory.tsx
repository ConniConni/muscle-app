import type { Route } from "../+types/root";
import Title from "~/utils/Title";
import ManageMstTrainingPage from "~/pages/components/ManageMstTrainingPage";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: Title.title,
      description: Title.description,
      content: Title.content,
    },
  ];
}

export default function Update() {
  return <ManageMstTrainingPage />;
}
