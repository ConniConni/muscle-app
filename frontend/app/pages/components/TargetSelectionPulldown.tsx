import React from "react";
// import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import BaseSelectionPulldown from "./BaseSelectionPulldown";

type TargetSelectionPulldownProps = {
  filterTarget: number;
  setFilterTarget: React.Dispatch<React.SetStateAction<number>>;
  // trainingRecord?: TrainingRecordWithExerciseId;
  // setTrainingRecord?: React.Dispatch<
  //   React.SetStateAction<TrainingRecordWithExerciseId>
  // >;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const TargetSelectionPulldown = ({
  filterTarget,
  setFilterTarget,
}: // trainingRecord,
// setTrainingRecord,
TargetSelectionPulldownProps) => {
  // 種目の変更状態を管理するハンドラー
  const handleTargetIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTargetIdStr = e.target.value;
    const newTargetId = newTargetIdStr === "" ? 0 : +newTargetIdStr;

    // 登録、更新画面でのプルダウン表示
    // if (trainingRecord !== undefined && setTrainingRecord !== undefined) {
    //   setTrainingRecord!({
    //     ...trainingRecord!,
    //     Target_id: newTargetId,
    //   });
    //   // 筋トレ実績画面でのプルダウン表示
    // } else {
    setFilterTarget(newTargetId);
    // }
  };
  return (
    <BaseSelectionPulldown
      filterVal={filterTarget}
      handleValueChange={handleTargetIdChange}
      apiEndPoint="target-area"
    />
  );
};
export default TargetSelectionPulldown;
