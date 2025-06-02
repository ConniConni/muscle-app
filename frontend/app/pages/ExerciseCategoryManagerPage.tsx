import { useEffect, useState } from "react";
import Button from "~/components/parts/Button";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import {
  createNewTraining,
  getExerciseCategory,
} from "~/apiActions/exerciseCategoryManager";
import TargetSelectionPulldown from "~/components/parts/pulldown/TargetSelectionPulldown";
import type { ExerciseCategory } from "~/type/exercise_category";
import type { PulldownSelectedValue } from "~/type/common";
import { getTargetAreaList } from "~/apiActions/TargetArea";

// 筋トレ種目（マスタ）登録画面を生成する関数コンポーネント
const ExerciseCategoryManagerPage = () => {
  const [exerciseCategory, setExerciseCategory] = useState<ExerciseCategory[]>(
    []
  );
  // 部位IDを保持するstateを追加
  const [selectedTargetId, setSelectedTargetId] = useState<number>(0);
  const [newExerciseCategory, setNewExerciseCategory] = useState<string>("");

  // 部位選択プルダウン用のstate
  const [targetOptions, setTargetOptions] = useState<PulldownSelectedValue[]>(
    []
  );

  // 部位リストを取得
  useEffect(() => {
    (async () => {
      const result = await getTargetAreaList();
      setTargetOptions(result.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getExerciseCategory();
      setExerciseCategory(result.data);
    })();
  }, []);
  // マスタ登録APIを呼び出す
  const handleCreateNewTraining = async () => {
    const result = await createNewTraining({
      target_id: selectedTargetId,
      name: newExerciseCategory,
    });

    if (result.success) {
      alert("マスタへの追加が完了しました。");
      setSelectedTargetId(0);
      setNewExerciseCategory("");
      const result = await getExerciseCategory();
      setExerciseCategory(result.data);
    } else {
      alert(`マスタ追加に失敗しました。\n\n${result.error}`);
    }
  };

  // 5ページ単位のページネーション
  const rowsPerPage = 5; // 1ページあたりの行数を設置
  const [currentPage, setCurrentPage] = useState(1); // 現在のページを管理するための状態

  // 表示するデータのインデックスを計算
  /* メモ
    1ページ目は trainingCategory.slice(0,5)で1~5個目のデータを
    2ページ目は trainingCategory.slice(5,10)で6~10個目のデータを
    currentDataに格納
  */
  const startRowIndex = (currentPage - 1) * rowsPerPage;
  const currentData = exerciseCategory.slice(
    startRowIndex,
    startRowIndex + rowsPerPage
  );

  // 総ページ数を計算 (trainingCategoryの要素数を5で割り、切り上げる)
  const totalPages =
    exerciseCategory.length === 0
      ? 1
      : Math.ceil(exerciseCategory.length / rowsPerPage);

  // 次のページへ進む
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 次のページへ戻る
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>トレーニング種目マスタ</h1>
          <div>
            <TargetSelectionPulldown
              name="target_id"
              options={targetOptions}
              value={selectedTargetId}
              onChange={(e) => setSelectedTargetId(+e.target.value)}
            />
            <input
              type="text"
              value={newExerciseCategory}
              onChange={(e) => setNewExerciseCategory(e.target.value)}
            />
            <Button onClick={handleCreateNewTraining} buttonName="マスタ追加" />
          </div>
          <table>
            <thead>
              <tr>
                <th className="training-name-header">部位名</th>
                <th className="training-name-header">種目名</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((trainingName, index) => {
                return (
                  <tr key={index}>
                    <th className="training-name-record">
                      {trainingName.target_name}
                    </th>
                    <th className="training-name-record">
                      {trainingName.exercise_name}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <Button
              onClick={handlePrev}
              buttonName="前"
              disabled={currentPage === 1}
            ></Button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <Button
              onClick={handleNext}
              buttonName="次"
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExerciseCategoryManagerPage;
