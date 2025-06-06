import type { TrainingRecordWithName } from "~/type/training_record";
import { trainingRecordDelete } from "~/apiActions/TrainingRecord";
import TrainingRecordListTable from "./TrainingRecordListTable";

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

// 日付ごとの筋トレ実績一覧を生成する関数コンポーネント
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
  return (
    <TrainingRecordListTable
      trainingRecord={trainingRecord}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleDelete={handleDelete}
    />
  );
};
export default TrainingRecordTableByDate;
