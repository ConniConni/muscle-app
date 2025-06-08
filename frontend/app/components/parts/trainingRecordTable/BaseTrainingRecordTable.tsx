import { useNavigate } from "react-router";
import Button from "~/components/parts/Button";
import type { TrainingRecordWithName } from "~/type/training_record";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import TooltipIconButton from "../TooltipIconButton";

type TrainingRecordListTableProps = {
  trainingRecord: TrainingRecordWithName[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handleDelete: (id: number) => void;
};
const BaseTrainingRecordTable = ({
  trainingRecord,
  currentPage,
  setCurrentPage,
  handleDelete,
}: TrainingRecordListTableProps) => {
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
            <th className="training-record-header"></th>
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
                  <Box display="flex" gap={0.5}>
                    <TooltipIconButton
                      tooltipTitle="編集"
                      iconButtonBackgroundColor="royalblue"
                      iconButtonColor="white"
                      iconButtonHoverBackgroundColor="white"
                      iconButtonHoverColor="royalblue"
                      id={c.id}
                      onClick={navigateToTrainingRecordEditPage}
                      IconComponent={EditIcon}
                    />
                    <TooltipIconButton
                      tooltipTitle="削除"
                      iconButtonBackgroundColor="tomato"
                      iconButtonColor="white"
                      iconButtonHoverBackgroundColor="white"
                      iconButtonHoverColor="tomato"
                      id={c.id}
                      onClick={handleDelete}
                      IconComponent={DeleteIcon}
                    />
                  </Box>
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
export default BaseTrainingRecordTable;
