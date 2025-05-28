import React, { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import BaseSelectionPulldown from "./BaseSelectionPulldown";
import { API_BASE_URL } from "~/config";
import type { PulldownSelectedValue } from "~/type/common";

type ExerciseSelectionPulldownProps = {
  filterTarget?: number;
  filterExercise: number;
  setFilterExercise: React.Dispatch<React.SetStateAction<number>>;
  trainingRecord?: TrainingRecordWithExerciseId;
  setTrainingRecord?: React.Dispatch<
    React.SetStateAction<TrainingRecordWithExerciseId>
  >;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const ExerciseSelectionPulldown = ({
  filterExercise,
  filterTarget,
  setFilterExercise,
  trainingRecord,
  setTrainingRecord,
}: ExerciseSelectionPulldownProps) => {
  // 種目名を取得
  const [selectedValues, setSelectedValues] = useState<PulldownSelectedValue[]>(
    []
  );
  const apiEndPoint =
    filterTarget && filterTarget > 0
      ? `exercise-category/target/${filterTarget}`
      : "exercise-category";
  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_BASE_URL}/${apiEndPoint}`);
      const result = await response.json();
      setSelectedValues(result);
      console.log("エンドポイント: ", apiEndPoint, ": 取得結果", result);
    })();
  }, [apiEndPoint]);
  // 種目の変更状態を管理するハンドラー
  const handleExerciseIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExerciseIdStr = e.target.value;
    const newExerciseId = newExerciseIdStr === "" ? 0 : +newExerciseIdStr;

    // 登録、更新画面でのプルダウン表示
    if (trainingRecord !== undefined && setTrainingRecord !== undefined) {
      setTrainingRecord!({
        ...trainingRecord!,
        exercise_id: newExerciseId,
      });
      // 筋トレ実績画面でのプルダウン表示
    } else {
      setFilterExercise(newExerciseId);
      console.log(
        "エンドポイント: ",
        `exercise-category/target/${filterTarget}`
      );
    }
  };
  return (
    <BaseSelectionPulldown
      filterVal={filterExercise}
      handleValueChange={handleExerciseIdChange}
      selectedValues={selectedValues}
    />
  );
};
export default ExerciseSelectionPulldown;
