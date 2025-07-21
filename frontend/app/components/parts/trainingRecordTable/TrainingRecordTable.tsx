import type { TrainingRecordWithName } from "~/type/training_record";
import { trainingRecordDelete } from "~${API_BASE_URL}Actions/TrainingRecord";
import BaseTrainingRecordTable from "./BaseTrainingRecordTable";

type TrainingRecordProps = {
  trainingRecord: TrainingRecordWithName[];
  currentPage: number;
  getTrainingRecord: () => Promise<
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
  setTrainingRecord: React.Dispatch<
    React.SetStateAction<TrainingRecordWithName[]>
  >;
  setCurrentPage: (page: number) => void;
};

// 筋トレ実績一覧を生成する関数コンポーネント
const TrainingRecordListTable = ({
  trainingRecord,
  currentPage,
  getTrainingRecord,
  setTrainingRecord,
  setCurrentPage,
}: TrainingRecordProps) => {
  // 個別筋トレデータ削除APIを呼び出す
  const handleDelete = async (id: number) => {
    const response = await trainingRecordDelete(id);
    if (response.success) {
      alert("削除が完了しました。");
      const result = await getTrainingRecord();
      if (result.success) {
        setTrainingRecord(result.data);
      }
    } else {
      alert(`削除できませんでした。\n\n${response.error}`);
    }
  };

  return (
    <BaseTrainingRecordTable
      trainingRecord={trainingRecord}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleDelete={handleDelete}
    />
  );
};
export default TrainingRecordListTable;
