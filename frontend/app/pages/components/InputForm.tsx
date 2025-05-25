import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TrainingData } from "~/type/training_data_type";
import Button from "./Button";
import ExerciseSelectionPulldown from "./ExerciseSelectionPulldown";
import { API_BASE_URL } from "~/config";

type Props = {
  onClick: (formDate: FormData) => void;
  actionName: string;
  color: string;
  background: string;
  hoverColor: string;
  hoverBackground: string;
};

// 入力フォームを生成する関数コンポーネント
const InputForm = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [filterVal, setFilterVal] = useState<number>(0);
  const [trainingData, setTrainingData] = useState<TrainingData>({
    id: 0,
    exercise_id: 0,
    date: new Date(),
    weight: 0,
    count: 0,
  });

  // 編集の際はidに紐づく筋トレ実績を取得する
  useEffect(() => {
    (async () => {
      if (id) {
        const response = await fetch(`${API_BASE_URL}/training-record/${id}`);
        const result = await response.json();
        console.log("api取得結果:", result);
        setTrainingData({ ...result, date: new Date(result.date) });
      }
    })();
  }, []);
  useEffect(() => {
    setFilterVal(trainingData.exercise_id);
    console.log("stateの値:", trainingData);
  }, [trainingData]);

  // 日付の変更状態を管理するハンドラー
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    const newDate = new Date(newDateStr);
    setTrainingData({
      ...trainingData,
      date: newDate,
    });
  };

  // 重量の変更状態を管理するハンドラー
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeightStr = e.target.value;
    const newWeight = newWeightStr === "" ? 0 : +newWeightStr;
    setTrainingData({
      ...trainingData,
      weight: newWeight,
    });
  };

  // 回数の変更状態を管理するハンドラー
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountStr = e.target.value;
    const newCount = newCountStr === "" ? 0 : +newCountStr;
    setTrainingData({
      ...trainingData,
      count: newCount,
    });
  };

  return (
    <div>
      <h1>{props.actionName}ぺージ</h1>
      <form action={props.onClick}>
        <div>
          <span>種目 </span>
          <ExerciseSelectionPulldown
            filterVal={filterVal}
            setFilterVal={setFilterVal}
          />
        </div>
        <div>
          <span>日付 </span>
          <input
            type="date"
            name="date"
            value={trainingData.date.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <span>重量 </span>
          <input
            type="number"
            step="0.5"
            min="0"
            name="weight"
            value={trainingData.weight || ""}
            onChange={handleWeightChange}
          />
        </div>
        <div>
          <span>回数 </span>
          <input
            type="number"
            min="0"
            name="count"
            value={trainingData.count || ""}
            onChange={handleCountChange}
          />
        </div>
        <Button
          type="submit"
          buttonName={props.actionName}
          color={props.color}
          background={props.background}
          hoverColor={props.hoverColor}
          hoverBackground={props.hoverBackground}
        />
      </form>
    </div>
  );
};
export default InputForm;
