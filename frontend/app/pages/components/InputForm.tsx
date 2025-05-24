import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TrainingData } from "~/type/training_data_type";
import Button from "./Button";

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
  const [trainingData, setTrainingData] = useState<TrainingData>({
    id: 0,
    category_id: 0,
    date: new Date(),
    count: 0,
  });

  // 編集の際はidに紐づく筋トレ実績を取得する
  useEffect(() => {
    (async () => {
      if (id) {
        const response = await fetch(
          `http://localhost:3000/training-record/id/${id}`
        );
        const result = await response.json();
        console.log("api取得結果:", result);
        setTrainingData({ ...result, date: new Date(result.date) });
      }
    })();
  }, []);
  useEffect(() => {
    console.log("stateの値:", trainingData);
  }, [trainingData]);

  // 種目の変更状態を管理するハンドラー
  const handleCategoryIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryIdStr = e.target.value;
    const newCategoryId = newCategoryIdStr === "" ? 0 : +newCategoryIdStr;
    setTrainingData({
      ...trainingData,
      category_id: newCategoryId,
    });
  };

  // 日付の変更状態を管理するハンドラー
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    const newDate = new Date(newDateStr);
    setTrainingData({
      ...trainingData,
      date: newDate,
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
          <select
            name="category_id"
            value={trainingData.category_id || ""}
            onChange={handleCategoryIdChange}
          >
            <option value="">選択してください</option>
            <option value="1">腹筋</option>
            <option value="2">腕立て</option>
            <option value="3">背筋</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={trainingData.date.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </div>
        <div>
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
