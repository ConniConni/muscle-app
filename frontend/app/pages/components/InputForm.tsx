import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import Button from "./Button";
import ExerciseSelectionPulldown from "./ExerciseSelectionPulldown";
import TargetSelectionPulldown from "./TargetSelectionPulldown";

type Props = {
  filterVal: number;
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
  filterTarget: number;
  setFilterTarget: React.Dispatch<React.SetStateAction<number>>;
  trainingRecord: TrainingRecordWithExerciseId;
  setTrainingRecord: React.Dispatch<
    React.SetStateAction<TrainingRecordWithExerciseId>
  >;
  onClick: (formData: FormData) => void;
  actionName: string;
  color: string;
  background: string;
  hoverColor: string;
  hoverBackground: string;
};

// 入力フォームを生成する関数コンポーネント
const InputForm = (props: Props) => {
  // 日付の変更状態を管理するハンドラー
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    const newDate = new Date(newDateStr);
    props.setTrainingRecord({
      ...props.trainingRecord,
      date: newDate,
    });
  };

  // 重量の変更状態を管理するハンドラー
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeightStr = e.target.value;
    const newWeight = newWeightStr === "" ? 0 : +newWeightStr;
    props.setTrainingRecord({
      ...props.trainingRecord,
      weight: newWeight,
    });
  };

  // 回数の変更状態を管理するハンドラー
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountStr = e.target.value;
    const newCount = newCountStr === "" ? 0 : +newCountStr;
    props.setTrainingRecord({
      ...props.trainingRecord,
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
            filterTarget={props.filterTarget}
            setFilterTarget={props.setFilterTarget}
            trainingRecord={props.trainingRecord}
            setTrainingRecord={props.setTrainingRecord}
          />
        </div>
        <div>
          <span>種目 </span>
          <ExerciseSelectionPulldown
            filterTarget={props.filterTarget} // プルダウンに部位に紐づく種目のみを表示するために追加
            filterExercise={props.filterVal}
            setFilterExercise={props.setFilterVal}
            trainingRecord={props.trainingRecord}
            setTrainingRecord={props.setTrainingRecord}
          />
        </div>
        <div>
          <span>日付 </span>
          <input
            type="date"
            name="date"
            value={props.trainingRecord.date.toISOString().split("T")[0]}
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
            value={props.trainingRecord.weight || ""}
            onChange={handleWeightChange}
          />
        </div>
        <div>
          <span>回数 </span>
          <input
            type="number"
            min="0"
            name="count"
            value={props.trainingRecord.count || ""}
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
