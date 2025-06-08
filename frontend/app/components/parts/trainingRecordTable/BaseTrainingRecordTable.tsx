import { useNavigate } from "react-router";
import Button from "~/components/parts/Button";
import type { TrainingRecordWithName } from "~/type/training_record";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

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
                  <Box display="flex" gap={0.5}>
                    <Tooltip
                      title="編集"
                      placement="top"
                      arrow
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -16], // [水平方向, 垂直方向] 16pxだけ下にずらす
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        sx={{
                          backgroundColor: "royalblue",
                          color: "white",
                          borderRadius: 1, // 枠を四角に変更
                          "&:hover": {
                            backgroundColor: "white", // ホバー時色を反転
                            color: "royalblue",
                            cursor: "pointer", //  ホバー時カーソルをポインターに変更
                          },
                        }}
                        onClick={() => navigateToTrainingRecordEditPage(c.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="削除"
                      placement="top"
                      arrow
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -16], // [水平方向, 垂直方向] 16pxだけ下にずらす
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <IconButton
                        sx={{
                          backgroundColor: "tomato",
                          color: "white",
                          borderRadius: 1, // 枠を四角に変更
                          "&:hover": {
                            backgroundColor: "white", // ホバー時色を反転
                            color: "tomato",
                            cursor: "pointer", //  ホバー時カーソルをポインターに変更
                          },
                        }}
                        onClick={() => handleDelete(c.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
