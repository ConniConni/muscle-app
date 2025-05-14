import { useEffect, useState } from "react";
import type { TrainingCategory } from "~/type/training_category_type";
import Button from "./Button";

const ManageMstPage = () => {
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
      <Button onClick={() => {}} buttonName="マスタ追加" />
      <table>
        <thead>
          <tr>
            <th className="training-name-header">種目名</th>
          </tr>
        </thead>
        <tbody>
          {trainingCategory.map((trainingName) => {
            return (
              <tr key={trainingName.id}>
                <th className="training-name-record">{trainingName.name}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ManageMstPage;
