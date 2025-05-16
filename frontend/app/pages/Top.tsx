import { useState } from "react";
import TrainingList from "./components/TrainingList";
import Button from "./components/Button";
import { useNavigate } from "react-router";
import CategorySelectionPulldown from "./components/CategorySelectionPulldown";
import type { TrainingRecord } from "~/type/training_record_type";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export function Top() {
  // useNavigateを定義 useNavigateは
  const navigate = useNavigate();
  const [trainingRecord, setTrainingRecord] = useState<TrainingRecord[]>([]);
  const [filterVal, setFilterVal] = useState<number>(0);

  const getTrainingRecord = async () => {
    const response = await fetch("http://localhost:3000/muscle/");
    const result = await response.json();
    setTrainingRecord(result);

    console.log(result, "test");
  };
  // 新規登録ボタンをクリックすると新規登録ページ(パス:/create)に遷移する
  const navigateToCreatePage = () => {
    navigate("/create");
  };

  const getSelectCategoryId = async () => {
    if (filterVal != 0) {
      const response = await fetch(
        `http://localhost:3000/muscle/category/${filterVal}`
      );
      const result = await response.json();
      setTrainingRecord(result);
    }
  };

  const navigateToManageMstMuscleCategoryPage = async () => {
    navigate("/manage-mst-muscle-category");
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>筋トレ実績</h1>
          <div>
            <Button onClick={navigateToCreatePage} buttonName="新規登録" />
            <Button onClick={getTrainingRecord} buttonName="一覧取得" />
            <Button
              onClick={navigateToManageMstMuscleCategoryPage}
              buttonName="種目管理"
            />
          </div>
          <div>
            <Button onClick={getSelectCategoryId} buttonName="絞り込み" />
            <CategorySelectionPulldown setFilterVal={setFilterVal} />
          </div>
          <TrainingList
            trainingRecord={trainingRecord}
            getTrainingRecord={getTrainingRecord}
          />
        </div>
      </div>
    </div>
  );
}
