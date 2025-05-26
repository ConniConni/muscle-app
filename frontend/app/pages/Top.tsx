import { useEffect, useState } from "react";
import TrainingRecordTable from "./components/TrainingRecordTable";
import Button from "./components/Button";
import ExerciseSelectionPulldown from "./components/ExerciseSelectionPulldown";
import type { TrainingRecordWithName } from "~/type/training_record";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { API_BASE_URL } from "../config";

// トップページを生成する関数コンポーネント
export function Top() {
  const [trainingRecord, setTrainingRecord] = useState<
    TrainingRecordWithName[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterVal, setFilterVal] = useState<number>(0);

  // 筋トレ実績一覧取得処理呼び出し
  const getTrainingRecord = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/training-record/`);
      if (response.status != 200) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      const result = await response.json();
      setTrainingRecord(result);
    } catch (error: any) {
      alert(`一覧取得に失敗しました。\n\n${error.message}`);
    }
  };

  // 絞り込み表示処理呼び出し
  const getSelectExerciseId = async () => {
    if (filterVal != 0) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/training-record/exercise/${filterVal}`
        );
        if (response.status != 200) {
          const errorData = await response.json();
          throw new Error(
            `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
          );
        }
        const result = await response.json();
        setTrainingRecord(result);
        setCurrentPage(1);
      } catch (error: any) {
        alert(`絞り込みに失敗しました。${error.message}`);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_BASE_URL}/training-record/`);
      const result = await response.json();
      console.log("api取得結果:", result);
      setTrainingRecord(result);
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
            <Button onClick={getTrainingRecord} buttonName="一覧取得" />
          </div>
          <div>
            <Button onClick={getSelectExerciseId} buttonName="絞り込み" />
            <ExerciseSelectionPulldown
              filterVal={filterVal}
              setFilterVal={setFilterVal}
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
