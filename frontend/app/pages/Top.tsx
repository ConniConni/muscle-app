import { useState } from "react";
import TrainingList from "./components/TrainingList";
import type { TrainingRecode } from "~/type/training_recode_type";
import Button from "./components/Button";
import { useNavigate } from "react-router";

export function Top() {
  // useNavigateを定義 useNavigateは
  const navigate = useNavigate();
  const [trainingRecode, setTrainingRecode] = useState<TrainingRecode[]>([]);

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

  return (
    <div className="top">
      <h1>筋トレ実績</h1>
      <div>
        <Button onClick={navigateToCreatePage} buttonName="新規登録" />
      </div>
      <div>
        <Button onClick={getTrainingRecode} buttonName="一覧取得" />
      </div>
      <TrainingList trainingRecode={trainingRecode} />
    </div>
  );
}
