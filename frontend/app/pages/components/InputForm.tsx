import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import Button from "./Button";
import ExerciseSelectionPulldown from "./ExerciseSelectionPulldown";
import { API_BASE_URL } from "~/config";
import TargetSelectionPulldown from "./TargetSelectionPulldown";

type Props = {
  onClick: (formData: FormData) => void;
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
  // 部位選択プルダウン用のstateを追加
  const [filterTarget, setFilterTarget] = useState<number>(0);
  const [trainingRecord, setTrainingRecord] =
    useState<TrainingRecordWithExerciseId>({
      id: 0,
      target_id: 0,
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
        console.log("個別データ取得api結果:", result);
        setTrainingRecord({ ...result, date: new Date(result.date) });
      }
    })();
  }, []);
  useEffect(() => {
    setFilterVal(trainingRecord.exercise_id);
    setFilterTarget(trainingRecord.target_id);
    console.log("stateの値:", trainingRecord);
  }, [trainingRecord]);

  // 日付の変更状態を管理するハンドラー
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    const newDate = new Date(newDateStr);
    setTrainingRecord({
      ...trainingRecord,
      date: newDate,
    });
  };

  // 重量の変更状態を管理するハンドラー
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeightStr = e.target.value;
    const newWeight = newWeightStr === "" ? 0 : +newWeightStr;
    setTrainingRecord({
      ...trainingRecord,
      weight: newWeight,
    });
  };

  // 回数の変更状態を管理するハンドラー
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountStr = e.target.value;
    const newCount = newCountStr === "" ? 0 : +newCountStr;
    setTrainingRecord({
      ...trainingRecord,
      count: newCount,
    });
  };

  return (
    <div>
      <h1>{props.actionName}ぺージ</h1>
      <form action={props.onClick}>
        <div>
          <span>部位 </span>
          <TargetSelectionPulldown //部位選択プルダウン用の追加
            filterTarget={filterTarget}
            setFilterTarget={setFilterTarget}
          />
        </div>
        <div>
          <span>種目 </span>
          <ExerciseSelectionPulldown
            filterExercise={filterVal}
            setFilterExercise={setFilterVal}
            trainingRecord={trainingRecord}
            setTrainingRecord={setTrainingRecord}
          />
        </div>
        <div>
          <span>日付 </span>
          <input
            type="date"
            name="date"
            value={trainingRecord.date.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <span>重量 </span>{" "}
          {/* 0以上の数値を0.5刻みで入力可能とするフォーム　 */}
          <input
            type="number"
            step="0.5"
            min="0"
            name="weight"
            value={trainingRecord.weight || ""}
            onChange={handleWeightChange}
          />
        </div>
        <div>
          <span>回数 </span>
          <input
            type="number"
            min="0"
            name="count"
            value={trainingRecord.count || ""}
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
