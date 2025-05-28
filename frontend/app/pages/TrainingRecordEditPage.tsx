import InputForm from "~/components/InputForm";
import { useNavigate, useParams } from "react-router";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import { API_BASE_URL } from "~/config";
import { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";

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
        const response = await fetch(`${API_BASE_URL}/training-record/${id}`);
        const result = await response.json();
        console.log("個別データ取得api結果:", result);
        setTrainingRecord({ ...result, date: new Date(result.date) });
      }
    })();
  }, []);
  useEffect(() => {
    setFilterTarget(trainingRecord.target_id);
    setFilterVal(trainingRecord.exercise_id);
    console.log("stateの値:", trainingRecord);
  }, [trainingRecord]);

  // 筋トレ記録更新処理呼び出し
  const updateTrainingRecord = async (formData: FormData) => {
    const exerciseId = formData.get("exercise_id");
    const date = formData.get("date");
    const weight = formData.get("weight");
    const count = formData.get("count");
    if (exerciseId && date && count) {
      try {
        const response = await fetch(`${API_BASE_URL}/training-record/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exercise_id: +exerciseId!,
            date: date,
            weight: +weight!,
            count: +count!,
          }),
        });

        if (response.status != 200) {
          const errorData = await response.json();
          throw new Error(
            `HTTP ${errorData.statusCode} エラー \n${errorData.message}`
          );
        }
        alert("更新が完了しました。");
        backTopPage();
      } catch (error: any) {
        alert(`データの更新に失敗しました。\n\n${error.message}`);
      }
    } else {
      const alertMessage: string[] = [];
      if (!exerciseId) {
        alertMessage.push("トレーニングを選択してください");
      }
      if (!date) {
        alertMessage.push("実施日を選択してください");
      }
      if (!weight) {
        alertMessage.push("重量を入力してください");
      }
      if (!count) {
        alertMessage.push("回数を入力してください");
      }
      alert(alertMessage.join("\n"));
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
            onClick={updateTrainingRecord}
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
