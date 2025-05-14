import { useEffect, useState } from "react";
import type { TrainingCategory } from "~/type/training_category_type";
import Button from "./Button";
import { useNavigate } from "react-router";

const ManageMstTrainingPage = () => {
  const [trainingCategory, setTrainingCategory] = useState<TrainingCategory[]>(
    []
  );
  const [newTraining, setNewTraining] = useState<string>("");
  const navigate = useNavigate();

  const getMstMuscleCategory = async () => {
    const response = await fetch("http://localhost:3000/mst-muscle-category");
    const result = await response.json();
    setTrainingCategory(result);
    console.log(result);
  };
  useEffect(() => {
    getMstMuscleCategory();
  }, []);

  const createNewTraining = async () => {
    console.log(newTraining);
    if (newTraining.length > 0) {
      await fetch(`http://localhost:3000/mst-muscle-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTraining,
        }),
      });
      alert("マスタへの追加が完了しました。");
      setNewTraining("");
      getMstMuscleCategory();
    } else alert("入力画面には1文字以上の文字を入力してください");
  };

  const backTopPage = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>トレーニング種目マスタ</h1>
      <div>
        <input
          type="text"
          value={newTraining}
          onChange={(e) => setNewTraining(e.target.value)}
        />
        <Button onClick={createNewTraining} buttonName="マスタ追加" />
      </div>
      <div>
        <Button onClick={backTopPage} buttonName="戻る" />
      </div>
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
export default ManageMstTrainingPage;
