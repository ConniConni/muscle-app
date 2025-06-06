import type { TrainingRecordWithName } from "~/type/training_record";
import { trainingRecordDelete } from "~/apiActions/TrainingRecord";
import TrainingRecordListTable from "./TrainingRecordListTable";

type TrainingRecordProps = {
  trainingRecord: TrainingRecordWithName[];
  currentPage: number;
  getTrainingRecord: () => void;
  setCurrentPage: (page: number) => void;
};

// 筋トレ実績一覧を生成する関数コンポーネント
const TrainingRecordTable = ({
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
      getTrainingRecord();
    } else {
      alert(`削除できませんでした。\n\n${response.error}`);
    }
  };

  return (
    <TrainingRecordListTable
      trainingRecord={trainingRecord}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleDelete={handleDelete}
    />
  );
};
export default TrainingRecordTable;
