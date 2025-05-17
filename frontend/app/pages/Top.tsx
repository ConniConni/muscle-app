import { useEffect, useState } from "react";
import TrainingList from "./components/TrainingList";
import Button from "./components/Button";
import CategorySelectionPulldown from "./components/CategorySelectionPulldown";
import type { TrainingRecord } from "~/type/training_record_type";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export function Top() {
  const [trainingRecord, setTrainingRecord] = useState<TrainingRecord[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterVal, setFilterVal] = useState<number>(0);

  const getTrainingRecord = async () => {
    try {
      const response = await fetch("http://localhost:3000/muscle/");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      const result = await response.json();
      setTrainingRecord(result);

      console.log(result, "test");
    } catch (error: any) {
      alert(`一覧取得に失敗しました。\n\n${error.message}`);
    }
  };

  const getSelectCategoryId = async () => {
    if (filterVal != 0) {
      const response = await fetch(
        `http://localhost:3000/muscle/category/${filterVal}`
      );
      const result = await response.json();
      setTrainingRecord(result);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/muscle/`);
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
