import { useNavigate } from "react-router";
import Button from "~/components/parts/Button";
import type { TrainingRecordWithName } from "~/type/training_record";

type TrainingRecordListTableProps = {
  trainingRecord: TrainingRecordWithName[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleDelete: (id: number) => void;
};
const TrainingRecordListTable = (props: TrainingRecordListTableProps) => {
  const rowsPerPage = 5; // 1ページあたりの行数を設置

  const startRowIndex = (props.currentPage - 1) * rowsPerPage;
  const currentData = props.trainingRecord.slice(
    startRowIndex,
    startRowIndex + rowsPerPage
  );
  // 総ページ数を計算 (trainingRecordの要素数を5で割り、切り上げる)
  // ただし、trainingRecordの要素数が0の時は１をセット
  const totalPages =
    props.trainingRecord.length === 0
      ? 1
      : Math.ceil(props.trainingRecord.length / rowsPerPage);
  // 次のページへ進む
  const handleNext = () => {
    if (props.currentPage < totalPages) {
      props.setCurrentPage(props.currentPage + 1);
    }
  };

  // 次のページへ戻る
  const handlePrev = () => {
    if (props.currentPage > 1) {
      props.setCurrentPage(props.currentPage - 1);
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
                    onClick={() => props.handleDelete(c.id)}
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
          disabled={props.currentPage === 1}
        ></Button>
        <span>{`${props.currentPage} / ${totalPages}`}</span>
        <Button
          onClick={handleNext}
          buttonName="次"
          disabled={props.currentPage === totalPages}
        />
      </div>
    </div>
  );
};
export default TrainingRecordListTable;
