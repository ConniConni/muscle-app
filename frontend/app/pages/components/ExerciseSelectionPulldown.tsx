import React from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import BaseSelectionPulldown from "./BaseSelectionPulldown";

type ExerciseSelectionPulldownProps = {
  filterTarget?: number;
  filterVal: number;
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
  trainingRecord?: TrainingRecordWithExerciseId;
  setTrainingRecord?: React.Dispatch<
    React.SetStateAction<TrainingRecordWithExerciseId>
  >;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const ExerciseSelectionPulldown = ({
  filterVal,
  filterTarget,
  setFilterVal,
  trainingRecord,
  setTrainingRecord,
}: ExerciseSelectionPulldownProps) => {
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
      setFilterVal(newExerciseId);
      console.log(
        "エンドポイント: ",
        `exercise-category/target/${filterTarget}`
      );
    }
  };
  return (
    <BaseSelectionPulldown
      filterVal={filterVal}
      handleValueChange={handleExerciseIdChange}
      apiEndPoint={
        filterTarget && filterTarget > 0
          ? `exercise-category/target/${filterTarget}`
          : "exercise-category"
      }
    />
  );
};
export default ExerciseSelectionPulldown;
