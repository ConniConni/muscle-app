import { useEffect, useState } from "react";
import TrainingList from "./components/TrainingList";
import Button from "./components/Button";
import CategorySelectionPulldown from "./components/CategorySelectionPulldown";
import type { TrainingRecord } from "~/type/training_record_type";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// トップページを生成する関数コンポーネント
export function Top() {
  const [trainingRecord, setTrainingRecord] = useState<TrainingRecord[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterVal, setFilterVal] = useState<number>(0);

  // 筋トレ実績一覧取得処理呼び出し
  const getTrainingRecord = async () => {
    try {
      const response = await fetch("http://localhost:3000/training-record/");
      if (response.status != 200) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      const result = await response.json();
      setTrainingRecord(result);
      console.log("trainingRecord:", result);
    } catch (error: any) {
      alert(`一覧取得に失敗しました。\n\n${error.message}`);
    }
  };

  // 絞り込み表示処理呼び出し
  const getSelectCategoryId = async () => {
    if (filterVal != 0) {
      try {
        const response = await fetch(
          `http://localhost:3000/training-record/exercise/${filterVal}`
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
      const response = await fetch(`http://localhost:3000/training-record/`);
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
            <Button onClick={getSelectCategoryId} buttonName="絞り込み" />
            <CategorySelectionPulldown setFilterVal={setFilterVal} />
          </div>
          <TrainingList
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
