import { useEffect, useState } from "react";
import type { TrainingCategory } from "~/type/training_category_type";
import Button from "./Button";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ManageMstTrainingPage = () => {
  const [trainingCategory, setTrainingCategory] = useState<TrainingCategory[]>(
    []
  );
  const [newTraining, setNewTraining] = useState<string>("");

  const getMstMuscleCategory = async () => {
    const response = await fetch("http://localhost:3000/mst-muscle-category");
    const result = await response.json();
    setTrainingCategory(result);
    console.log(result);
  };
  useEffect(() => {
    getMstMuscleCategory();
  }, []);

  const createNewTraining = async () => {
    console.log(newTraining);
    if (newTraining.length > 0) {
      await fetch(`http://localhost:3000/mst-muscle-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTraining,
        }),
      });
      alert("マスタへの追加が完了しました。");
      setNewTraining("");
      getMstMuscleCategory();
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
  const currentData = trainingCategory.slice(
    startRowIndex,
    startRowIndex + rowsPerPage
  );

  // 総ページ数を計算 (trainingCategoryの要素数を5で割り、切り上げる)
  const totalPages =
    trainingCategory.length === 0
      ? 1
      : Math.ceil(trainingCategory.length / rowsPerPage);

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
              value={newTraining}
              onChange={(e) => setNewTraining(e.target.value)}
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
export default ManageMstTrainingPage;
