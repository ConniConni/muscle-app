import { useEffect, useState } from "react";
import TrainingRecordTable from "~/components/features/top/TrainingRecordTable";
import Button from "~/components/parts/Button";
import ExerciseSelectionPulldown from "~/components/parts/pulldown/ExerciseSelectionPulldown";
import type { TrainingRecordWithName } from "~/type/training_record";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import TargetSelectionPulldown from "~/components/parts/pulldown/TargetSelectionPulldown";
import {
  getSelectExerciseId,
  getTrainingRecord,
} from "~/apiActions/TrainingRecord";

// トップページを生成する関数コンポーネント
export function Top() {
  const [trainingRecord, setTrainingRecord] = useState<
    TrainingRecordWithName[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterExercise, setFilterExercise] = useState<number>(0);
  // 部位選択プルダウン用のstateを追加
  const [filterTarget, setFilterTarget] = useState<number>(0);

  // 一覧取得処理呼び出し
  const handleGetTrainingRecord = async () => {
    const result = await getTrainingRecord();
    if (result.success) {
      setTrainingRecord(result.data);
      setCurrentPage(1);
    } else {
      alert(`一覧取得に失敗しました。\n\n${result.error}`);
    }
  };

  // 絞り込み表示処理呼び出し
  const handleGetSelectExerciseId = async () => {
    const result = await getSelectExerciseId(filterExercise);
    if (result.success) {
      setTrainingRecord(result.data);
      setCurrentPage(1);
    } else {
      alert(`絞り込みに失敗しました。${result.error}`);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getTrainingRecord();
      if (result.success) {
        setTrainingRecord(result.data);
      } else {
        alert(`一覧取得に失敗しました。\n\n${result.error}`);
      }
    })();
  }, []);

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>筋トレ実績</h1>
          <div>
            <Button onClick={handleGetTrainingRecord} buttonName="一覧取得" />
          </div>
          <div>
            <Button onClick={handleGetSelectExerciseId} buttonName="絞り込み" />
            <TargetSelectionPulldown //部位選択プルダウン用の追加
              filterTarget={filterTarget}
              setFilterTarget={setFilterTarget}
            />
            <ExerciseSelectionPulldown
              filterExercise={filterExercise}
              filterTarget={filterTarget}
              setFilterExercise={setFilterExercise}
            />
          </div>
          <TrainingRecordTable
            trainingRecord={trainingRecord}
            currentPage={currentPage}
            getTrainingRecord={getTrainingRecord}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
