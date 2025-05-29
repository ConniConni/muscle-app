import { useNavigate } from "react-router";
import InputForm from "~/components/InputForm";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import { createTrainingRecord } from "~/apiActions/TrainingRecord";

// 筋トレ実績登録画面を生成する関数コンポーネント
const TrainingRecordCreatePage = () => {
  // トップ画面に戻るための処理
  const navigate = useNavigate();
  const backTopPage = () => {
    navigate("/");
  };

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

  useEffect(() => {
    setFilterTarget(trainingRecord.target_id);
    setFilterVal(trainingRecord.exercise_id);
    console.log("stateの値:", trainingRecord);
  }, [trainingRecord]);

  // トレーニング記録登録に必要なデータの取得
  const handleCreate = async (formData: FormData) => {
    const exercise_id = formData.get("exercise_id");
    const date = formData.get("date");
    const weight = formData.get("weight");
    const count = formData.get("count");

    // トレーニング記録登録処理呼び出し
    const response = await createTrainingRecord({
      exercise_id: +exercise_id!,
      date: date as string,
      weight: +weight!,
      count: +count!,
    });

    if (response.success) {
      alert("登録が完了しました。");
      backTopPage();
    } else {
      alert(`データの登録に失敗しました。\n\n${response.error}`);
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <InputForm
            filterVal={filterVal}
            setFilterVal={setFilterVal}
            filterTarget={filterTarget}
            setFilterTarget={setFilterTarget}
            trainingRecord={trainingRecord}
            setTrainingRecord={setTrainingRecord}
            onClick={handleCreate}
            actionName="登録"
            color="white"
            background="seagreen"
            hoverColor="seagreen"
            hoverBackground="white"
          />
        </div>
      </div>
    </div>
  );
};
export default TrainingRecordCreatePage;
