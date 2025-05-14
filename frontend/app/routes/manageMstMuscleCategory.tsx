import { useState } from "react";
import type { Route } from "../+types/root";
import Title from "~/utils/Title";
import type { TrainingCategory } from "~/type/training_category_type";

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
  const [trainingCategory, setTrainingCategory] = useState<TrainingCategory[]>(
    []
  );
  return <h1>テスト</h1>;
}
