import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "~/config";
import type { TrainingData } from "~/type/training_data_type";

type ExerciseSelectionPulldownProps = {
  filterVal: number;
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
  trainingData?: TrainingData;
  setTrainingData?: React.Dispatch<React.SetStateAction<TrainingData>>;
};

type ExerciseCategory = {
  id: number;
  name: string;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const ExerciseSelectionPulldown = ({
  filterVal,
  setFilterVal,
  trainingData,
  setTrainingData,
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

  // 種目の変更状態を管理するハンドラー

  const handleExerciseIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExerciseIdStr = e.target.value;
    const newExerciseId = newExerciseIdStr === "" ? 0 : +newExerciseIdStr;

    // 登録、更新画面でのプルダウン表示
    if (trainingData !== undefined && setTrainingData !== undefined) {
      console.log("trainingData: ", trainingData);
      console.log("setTrainingData: ", setTrainingData);
      setTrainingData!({
        ...trainingData!,
        exercise_id: newExerciseId,
      });
      // 筋トレ実績画面でのプルダウン表示
    } else {
      console.log("trainingData: ", trainingData);
      console.log("setTrainingData: ", setTrainingData);
      setFilterVal(newExerciseId);
    }
  };
  return (
    <select
      name="exercise_id"
      value={filterVal}
      onChange={handleExerciseIdChange}
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
