import { useEffect, useState } from "react";
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
  const getMstMuscleCategory = async () => {
    const response = await fetch("http://localhost:3000/mst-muscle-category");
    const result = await response.json();
    setTrainingCategory(result);
    console.log(result);
  };
  useEffect(() => {
    getMstMuscleCategory();
  }, []);

  return <h1>テスト</h1>;
}
