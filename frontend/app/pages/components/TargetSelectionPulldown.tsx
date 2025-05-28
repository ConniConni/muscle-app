import React, { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import BaseSelectionPulldown from "./BaseSelectionPulldown";
import type { exerciseCategory } from "~/type/exercise_category";
import { API_BASE_URL } from "~/config";

type TargetSelectionPulldownProps = {
  filterTarget: number;
  setFilterTarget: React.Dispatch<React.SetStateAction<number>>;
  trainingRecord?: TrainingRecordWithExerciseId;
  setTrainingRecord?: React.Dispatch<
    React.SetStateAction<TrainingRecordWithExerciseId>
  >;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const TargetSelectionPulldown = ({
  filterTarget,
  setFilterTarget,
  trainingRecord,
  setTrainingRecord,
}: TargetSelectionPulldownProps) => {
  // 部位名を取得
  const [selectedValues, setSelectedValues] = useState<exerciseCategory[]>([]);
  const apiEndPoint = "target-area";
  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_BASE_URL}/${apiEndPoint}`);
      const result = await response.json();
      setSelectedValues(result);
      console.log("エンドポイント: ", apiEndPoint, ": 取得結果", result);
    })();
  }, [apiEndPoint]);

  // 種目の変更状態を管理するハンドラー
  const handleTargetIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTargetIdStr = e.target.value;
    const newTargetId = newTargetIdStr === "" ? 0 : +newTargetIdStr;

    // 登録、更新画面でのプルダウン表示
    if (trainingRecord !== undefined && setTrainingRecord !== undefined) {
      setTrainingRecord!({
        ...trainingRecord!,
        target_id: newTargetId,
      });
      // 筋トレ実績画面でのプルダウン表示
    } else {
      setFilterTarget(newTargetId);
      console.log("filterTarget: ", filterTarget);
    }
  };
  return (
    <BaseSelectionPulldown
      filterVal={filterTarget}
      handleValueChange={handleTargetIdChange}
      selectedValues={selectedValues}
    />
  );
};
export default TargetSelectionPulldown;
