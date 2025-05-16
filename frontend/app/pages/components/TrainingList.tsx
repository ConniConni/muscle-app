import type { TrainingRecord } from "~/type/training_record_type";
import Button from "./Button";
import { useNavigate } from "react-router";

type TrainingRecordProps = {
  trainingRecord: TrainingRecord[];
  currentPage: number;
  getTrainingRecord: () => void;
  setCurrentPage: (page: number) => void;
};

const TrainingList = ({
  trainingRecord,
  currentPage,
  getTrainingRecord,
  setCurrentPage,
}: TrainingRecordProps) => {
  const TrainingListDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3000/muscle/id/${id}`, {
      method: `DELETE`,
    });
    if (response.ok) {
      alert("削除が完了しました。");
      getTrainingRecord();
    }
  };

  const rowsPerPage = 5; // 1ページあたりの行数を設置

  const startRowIndex = (currentPage - 1) * rowsPerPage;
  const currentData = trainingRecord.slice(
    startRowIndex,
    startRowIndex + rowsPerPage
  );
  // 総ページ数を計算 (trainingRecordの要素数を5で割り、切り上げる)
  // ただし、trainingRecordの要素数が0の時は１をセット
  const totalPages =
    trainingRecord.length === 0
      ? 1
      : Math.ceil(trainingRecord.length / rowsPerPage);
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

  const navigate = useNavigate();
  const navigateToUpdatePage = (id: number) => {
    navigate(`/update/${id}`);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="training-record-header">種目名</th>
            <th className="training-record-header">実施日</th>
            <th className="training-record-header">回数</th>
            <th className="training-record-header">編集・削除</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((c, index) => {
            const date = new Date(c.date);
            const formattedDate = date.toLocaleDateString("ja-JP");

            return (
              <tr key={index}>
                <th className="training-record-cell">{c.name}</th>
                <th className="training-record-cell">{formattedDate}</th>
                <th className="training-record-cell">{c.count}</th>
                <th className="training-record-cell">
                  <Button
                    onClick={() => navigateToUpdatePage(c.id)}
                    buttonName="編集"
                  />
                  <Button
                    onClick={() => TrainingListDelete(c.id)}
                    buttonName="削除"
                  />
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
  );
};
export default TrainingList;
