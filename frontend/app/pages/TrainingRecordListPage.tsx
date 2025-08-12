import { useEffect, useState } from "react";

import Button from "~/components/parts/Button";
import ExerciseSelectionPulldown from "~/components/parts/pulldown/ExerciseSelectionPulldown";
import type {
  TrainingRecordWithExerciseId,
  TrainingRecordWithName,
} from "~/type/training_record";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import TargetSelectionPulldown from "~/components/parts/pulldown/TargetSelectionPulldown";
import {
  getSelectExerciseId,
  getTrainingRecord,
} from "~/apiActions/TrainingRecord";
import type { PulldownSelectedValue } from "~/type/common";
import {
  getExerciseCategoryByTargetId,
  getTargetAreaList,
} from "~/apiActions/TargetArea";
import TrainingRecordListTable from "~/components/parts/trainingRecordTable/TrainingRecordTable";
import { format } from "date-fns-tz";

// トップページを生成する関数コンポーネント
const TrainingRecordListPage = () => {
  const [trainingRecords, setTrainingRecords] = useState<
    TrainingRecordWithName[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 部位選択プルダウン用のstate
  const [targetOptions, setTargetOptions] = useState<PulldownSelectedValue[]>(
    []
  );
  // 種目選択プルダウン用のstate
  const [exerciseOptions, setExerciseOptions] = useState<
    PulldownSelectedValue[]
  >([]);
  const [trainingRecord, setTrainingRecord] =
    useState<TrainingRecordWithExerciseId>({
      id: 0,
      target_id: 0,
      exercise_id: 0,
      date: format(new Date(), "yyyy-MM-dd"),
      weight: 0,
      count: 0,
    });

  // 一覧取得処理呼び出し
  const handleGetTrainingRecord = async () => {
    const result = await getTrainingRecord();
    if (result.success) {
      setTrainingRecords(result.data);
      setCurrentPage(1);
    } else {
      alert(`一覧取得に失敗しました。\n\n${result.error}`);
    }
  };

  // 絞り込み表示処理呼び出し
  const handleGetSelectExerciseId = async () => {
    const result = await getTrainingRecord({
      exercise_id: trainingRecord.exercise_id,
    });
    if (result.success) {
      setTrainingRecords(result.data);
      setCurrentPage(1);
    } else {
      alert(`絞り込みに失敗しました。${result.error}`);
    }
  };

  // 部位IDの変更状態を管理するハンドラー
  const handleTargetId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTargetIdStr = e.target.value;
    const newTargetId = newTargetIdStr === "" ? 0 : +newTargetIdStr;
    setTrainingRecord({
      ...trainingRecord,
      target_id: newTargetId,
    });
  };

  // 種目IDの変更状態を管理するハンドラー
  const handleExerciseId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExerciseIdStr = e.target.value;
    const newExerciseId = newExerciseIdStr === "" ? 0 : +newExerciseIdStr;
    setTrainingRecord({
      ...trainingRecord,
      exercise_id: newExerciseId,
    });
  };

  useEffect(() => {
    (async () => {
      const result = await getTrainingRecord();
      if (result.success) {
        setTrainingRecords(result.data);
      } else {
        alert(`一覧取得に失敗しました。\n\n${result.error}`);
      }
    })();
  }, []);

  // 部位IDが変わったら種目リスト取得
  useEffect(() => {
    (async () => {
      // 部位リストを取得
      const result = await getTargetAreaList();
      setTargetOptions(result.data);

      if (trainingRecord.target_id && trainingRecord.target_id > 0) {
        const result = await getExerciseCategoryByTargetId(
          trainingRecord.target_id
        );
        if (result.success) {
          setExerciseOptions(result.data);
        } else {
          alert(`部位に対応する種目の取得に失敗しました。${result.error}`);
        }
      }
    })();
  }, [trainingRecord.target_id]);

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">筋トレ実績</h1>
          <div>
            <Button onClick={handleGetTrainingRecord} buttonName="一覧取得" />
          </div>
          <div>
            <TargetSelectionPulldown
              name="target_id"
              options={targetOptions}
              value={trainingRecord.target_id}
              onChange={handleTargetId}
            />
            <ExerciseSelectionPulldown
              name="exercise_id"
              options={exerciseOptions}
              value={trainingRecord.exercise_id}
              onChange={handleExerciseId}
            />
            <Button onClick={handleGetSelectExerciseId} buttonName="絞り込み" />
          </div>
          <TrainingRecordListTable
            trainingRecord={trainingRecords}
            currentPage={currentPage}
            getTrainingRecord={getTrainingRecord}
            setTrainingRecord={setTrainingRecords}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
export default TrainingRecordListPage;
