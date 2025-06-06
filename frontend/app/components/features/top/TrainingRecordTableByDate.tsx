import type { TrainingRecordWithName } from "~/type/training_record";
import Button from "~/components/parts/Button";
import { useNavigate } from "react-router";
import { trainingRecordDelete } from "~/apiActions/TrainingRecord";

type TrainingRecordProps = {
  date: string;
  trainingRecord: TrainingRecordWithName[];
  currentPage: number;
  getTrainingRecord: (date: string) => Promise<
    | {
        success: boolean;
        data: any;
        error?: undefined;
      }
    | {
        success: boolean;
        error: any;
        data?: undefined;
      }
  >;
  setCurrentPage: (page: number) => void;
};

// 筋トレ実績一覧を生成する関数コンポーネント
const TrainingRecordTableByDate = ({
  date,
  trainingRecord,
  currentPage,
  getTrainingRecord,
  setCurrentPage,
}: TrainingRecordProps) => {
  // 個別筋トレデータ削除APIを呼び出す
  const handleDelete = async (id: number) => {
    const response = await trainingRecordDelete(id);
    if (response.success) {
      alert("削除が完了しました。");
      getTrainingRecord(date);
    } else {
      alert(`削除できませんでした。\n\n${response.error}`);
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
  const navigateToTrainingRecordEditPage = (id: number) => {
    navigate(`/update/${id}`);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="training-record-header">種目名</th>
            <th className="training-record-header">実施日</th>
            <th className="training-record-header">重量(kg)</th>
            <th className="training-record-header">回数(回)</th>
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
                <th className="training-record-cell">{c.weight}</th>
                <th className="training-record-cell">{c.count}</th>
                <th className="training-record-cell">
                  <Button
                    onClick={() => navigateToTrainingRecordEditPage(c.id)}
                    buttonName="編集"
                    color="white"
                    background="royalblue"
                    hoverColor="royalblue"
                    hoverBackground="white"
                  />
                  <Button
                    onClick={() => handleDelete(c.id)}
                    buttonName="削除"
                    color="white"
                    background="tomato"
                    hoverColor="tomato"
                    hoverBackground="white"
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
export default TrainingRecordTableByDate;
