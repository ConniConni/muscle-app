import { useNavigate, useParams } from "react-router";
import InputForm from "~/components/InputForm";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import {
  getTrainingRecordById,
  updateTrainingRecord,
} from "~${API_BASE_URL}Actions/TrainingRecord";
import type { PulldownSelectedValue } from "~/type/common";
import {
  getExerciseCategoryByTargetId,
  getTargetAreaList,
} from "~${API_BASE_URL}Actions/TargetArea";

// 筋トレ記録更新画面を生成する関数コンポーネント
const TrainingRecordEditPage = () => {
  // URL から id を取得
  const { id } = useParams<{ id: string }>();
  // トップ画面に戻るための処理
  const navigate = useNavigate();
  const backTopPage = () => {
    navigate("/");
  };
  // 部位選択プルダウン用のstate
  const [targetOptions, setTargetOptions] = useState<PulldownSelectedValue[]>(
    []
  );
  // 種目選択プルダウン用のstate
  const [exerciseOptions, setExerciseOptions] = useState<
    PulldownSelectedValue[]
  >([]);
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

  // 部位IDが変わったら種目リスト取得
  useEffect(() => {
    (async () => {
      // 部位リストを取得
      const result = await getTargetAreaList();
      setTargetOptions(result.data);

      if (trainingRecord.target_id && trainingRecord.target_id > 0) {
        const result = await getExerciseCategoryByTargetId(
          trainingRecord.target_id
        );
        if (result.success) {
          setExerciseOptions(result.data);
        } else {
          alert(`部位に対応する種目の取得に失敗しました。${result.error}`);
        }
      }
    })();
  }, [trainingRecord.target_id]);
  // 筋トレ記録更新処理呼び出し
  const handleUpdate = async (formData: FormData) => {
    const exerciseId = formData.get("exercise_id");
    const date = formData.get("date");
    const weight = formData.get("weight");
    const count = formData.get("count");

    // トレーニング記録登録処理呼び出し
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
      alert(`データの更新に失敗しました。\n\n${response.error}`);
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <InputForm
            exerciseOptions={exerciseOptions}
            targetOptions={targetOptions}
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
