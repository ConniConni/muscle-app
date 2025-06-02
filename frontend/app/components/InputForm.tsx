import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import Button from "./parts/Button";
import ExerciseSelectionPulldown from "./parts/pulldown/ExerciseSelectionPulldown";
import TargetSelectionPulldown from "./parts/pulldown/TargetSelectionPulldown";
import type { PulldownSelectedValue } from "~/type/common";

type Props = {
  exerciseOptions: PulldownSelectedValue[];
  targetOptions: PulldownSelectedValue[];
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

  // 部位IDの変更状態を管理するハンドラー
  const handleTargetId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTargetIdStr = e.target.value;
    const newTargetId = newTargetIdStr === "" ? 0 : +newTargetIdStr;
    props.setTrainingRecord({
      ...props.trainingRecord,
      target_id: newTargetId,
    });
  };

  // 種目IDの変更状態を管理するハンドラー
  const handleExerciseId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExerciseIdStr = e.target.value;
    const newExerciseId = newExerciseIdStr === "" ? 0 : +newExerciseIdStr;
    props.setTrainingRecord({
      ...props.trainingRecord,
      exercise_id: newExerciseId,
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
          <TargetSelectionPulldown
            name="target_id"
            options={props.targetOptions}
            value={props.trainingRecord.target_id}
            handleValueChange={handleTargetId}
          />
        </div>
        <div>
          <span>種目 </span>
          <ExerciseSelectionPulldown
            name="exercise_id"
            options={props.exerciseOptions}
            value={props.trainingRecord.exercise_id}
            handleValueChange={handleExerciseId}
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
