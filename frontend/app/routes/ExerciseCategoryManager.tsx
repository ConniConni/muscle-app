import type { Route } from "../+types/root";
import Title from "~/utils/Title";
import ExerciseCategoryManagerPage from "~/pages/ExerciseCategoryManagerPage";

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
  return <ExerciseCategoryManagerPage />;
}
