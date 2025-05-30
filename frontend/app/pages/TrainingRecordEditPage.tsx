import InputForm from "~/components/InputForm";
import { useNavigate, useParams } from "react-router";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import {
  getTrainingRecordById,
  updateTrainingRecord,
} from "~/apiActions/TrainingRecord";

// 筋トレ記録更新画面を生成する関数コンポーネント
const TrainingRecordEditPage = () => {
  // URL から id を取得
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
        const result = await getTrainingRecordById(+id);
        setTrainingRecord({ ...result.data, date: new Date(result.data.date) });
      }
    })();
  }, []);
  useEffect(() => {
    setFilterTarget(trainingRecord.target_id);
    setFilterVal(trainingRecord.exercise_id);
    console.log("stateの値:", trainingRecord);
  }, [trainingRecord]);

  // 筋トレ記録更新処理呼び出し
  const handleUpdate = async (formData: FormData) => {
    const exerciseId = formData.get("exercise_id");
    const date = formData.get("date");
    const weight = formData.get("weight");
    const count = formData.get("count");

    const response = await updateTrainingRecord({
      id: +id!,
      exercise_id: +exerciseId!,
      date: date as string,
      weight: +weight!,
      count: +count!,
    });

    if (response.success) {
      alert("更新が完了しました。");
      backTopPage();
    } else {
      alert(`データの登録に失敗しました。\n\n${response.error}`);
    }
  };

  const navigate = useNavigate();
  const backTopPage = () => {
    navigate("/");
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
            onClick={handleUpdate}
            actionName="更新"
            color="white"
            background="royalblue"
            hoverColor="royalblue"
            hoverBackground="white"
          />
        </div>
      </div>
    </div>
  );
};
export default TrainingRecordEditPage;
