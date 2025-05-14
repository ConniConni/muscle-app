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

  return (
    <div>
      <h1>トレーニング種目マスタ</h1>
      <table>
        <thead>
          <tr>
            <th className="training-name">種目名</th>
          </tr>
        </thead>
        <tbody>
          {trainingCategory.map((trainingName) => {
            return (
              <tr key={trainingName.name}>
                <th>{trainingName.name}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
