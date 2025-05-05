import { useState } from "react";
import TrainingList from "./components/TrainingList";
import MstSelectionPulldown from "./components/CategorySelectionPulldown";
import type { TrainingRecode } from "~/type/training_recode_type";
import Button from "./components/Button";
import { useNavigate } from "react-router";
import CategorySelectionPulldown from "./components/CategorySelectionPulldown";

export function Top() {
  // useNavigateを定義 useNavigateは
  const navigate = useNavigate();
  const [trainingRecode, setTrainingRecode] = useState<TrainingRecode[]>([]);
  const [filterVal, setFilterVal] = useState<number>(1);

  const getTrainingRecode = async () => {
    const response = await fetch("http://localhost:3000/muscle/");
    const result = await response.json();
    setTrainingRecode(result);

    console.log(result, "test");
  };
  // 新規登録ボタンをクリックすると新規登録ページ(パス:/create)に遷移する
  const navigateToCreatePage = () => {
    navigate("/create");
  };

  const getSelectCategoryId = () => {
    return;
  };

  return (
    <div className="top">
      <h1>筋トレ実績</h1>
      <div>
        <Button onClick={navigateToCreatePage} buttonName="新規登録" />
        <Button onClick={getTrainingRecode} buttonName="一覧取得" />
      </div>
      <div>
        <Button onClick={getSelectCategoryId} buttonName="絞り込み" />
        <CategorySelectionPulldown setFilterVal={setFilterVal} />
      </div>
      <TrainingList trainingRecode={trainingRecode} />
    </div>
  );
}
