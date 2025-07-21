import { useNavigate, useSearchParams } from "react-router";
import InputForm from "~/components/InputForm";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import { useEffect, useState } from "react";
import type { TrainingRecordWithExerciseId } from "~/type/training_record";
import { createTrainingRecord } from "~/apiActions/TrainingRecord";
import type { PulldownSelectedValue } from "~/type/common";
import {
  getExerciseCategoryByTargetId,
  getTargetAreaList,
} from "~/apiActions/TargetArea";
import { toZonedTime } from "date-fns-tz";

// 筋トレ実績登録画面を生成する関数コンポーネント
const TrainingRecordCreatePage = () => {
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
      date: toZonedTime(new Date(), "Asia/Tokyo"),
      weight: 0,
      count: 0,
    });
  // URLのクエリパラメータからdateの値を取得する
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");

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

  // カレンダーから登録ページに遷移した際は、選択した日をセットする
  useEffect(() => {
    if (date) {
      console.log(date);
      setTrainingRecord((trainingRecord) => ({
        ...trainingRecord,
        date: new Date(date),
      }));
    }
  }, []);

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
            exerciseOptions={exerciseOptions}
            targetOptions={targetOptions}
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
