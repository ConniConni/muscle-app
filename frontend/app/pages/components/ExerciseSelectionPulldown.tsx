import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "~/config";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
i;

type ExerciseSelectionPulldownProps = {
  filterVal: number;
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
  trainingRecord?: TrainingRecordWithExerciseId;
  setTrainingRecord?: React.Dispatch<
    React.SetStateAction<TrainingRecordWithExerciseId>
  >;
};

type ExerciseCategory = {
  id: number;
  name: string;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const ExerciseSelectionPulldown = ({
  filterVal,
  setFilterVal,
  trainingRecord,
  setTrainingRecord,
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
    if (trainingRecord !== undefined && setTrainingRecord !== undefined) {
      console.log("trainingRecord: ", trainingRecord);
      console.log("setTrainingRecord: ", setTrainingRecord);
      setTrainingRecord!({
        ...trainingRecord!,
        exercise_id: newExerciseId,
      });
      // 筋トレ実績画面でのプルダウン表示
    } else {
      console.log("trainingRecord: ", trainingRecord);
      console.log("setTrainingRecord: ", setTrainingRecord);
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
