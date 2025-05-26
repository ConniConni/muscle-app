import { useEffect, useState } from "react";
import type { exerciseCategory } from "~/type/exercise_category";
import Button from "./Button";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_BASE_URL } from "~/config";

// 筋トレ種目（マスタ）登録画面を生成する関数コンポーネント
const ExerciseCategoryManagerPage = () => {
  const [exerciseCategory, setExerciseCategory] = useState<exerciseCategory[]>(
    []
  );
  const [newExerciseCategory, setNewExerciseCategory] = useState<string>("");

  const getExerciseCategory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/exercise-category`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      const result = await response.json();
      setExerciseCategory(result);
      console.log(result);
    } catch (error: any) {
      alert(`マスタ一覧の取得に失敗しました。\n\n${error.message}`);
    }
  };
  useEffect(() => {
    getExerciseCategory();
  }, []);

  const createNewTraining = async () => {
    console.log(newExerciseCategory);
    if (newExerciseCategory.length > 0) {
      try {
        const response = await fetch(`${API_BASE_URL}/exercise-category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newExerciseCategory,
          }),
        });
        if (response.status != 201) {
          const errorData = await response.json();
          throw new Error(
            `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
          );
        }
        alert("マスタへの追加が完了しました。");
        setNewExerciseCategory("");
        getExerciseCategory();
      } catch (error: any) {
        alert(`マスタ追加に失敗しました。\n\n${error.message}`);
      }
    } else alert("入力画面には1文字以上の文字を入力してください");
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
            <input
              type="text"
              value={newExerciseCategory}
              onChange={(e) => setNewExerciseCategory(e.target.value)}
            />
            <Button onClick={createNewTraining} buttonName="マスタ追加" />
          </div>
          <table>
            <thead>
              <tr>
                <th className="training-name-header">種目名</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((trainingName, index) => {
                return (
                  <tr key={index}>
                    <th className="training-name-record">
                      {trainingName.name}
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
