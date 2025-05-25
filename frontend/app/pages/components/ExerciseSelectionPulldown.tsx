import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "~/config";

type ExerciseSelectionPulldownProps = {
  filterVal: number;
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
};

type ExerciseCategory = {
  id: number;
  name: string;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const ExerciseSelectionPulldown = ({
  filterVal,
  setFilterVal,
}: ExerciseSelectionPulldownProps) => {
  const [trainingName, setTrainingName] = useState<ExerciseCategory[]>([]);
  const getExerciseCategory = async () => {
    const response = await fetch(`${API_BASE_URL}/exercise-category`);
    const result = await response.json();
    setTrainingName(result);
    console.log("マスタ取得結果", result);
    console.log("filterVal:", filterVal);
  };

  useEffect(() => {
    getExerciseCategory();
  }, []);

  return (
    <select
      name="exercise_id"
      value={filterVal}
      onChange={(e) => setFilterVal(+e.target.value)}
    >
      <option value="">選択してください</option>
      {trainingName.map((exercise) => (
        <option key={exercise.id} value={exercise.id}>
          {exercise.name}
        </option>
      ))}
    </select>
  );
};
export default ExerciseSelectionPulldown;
