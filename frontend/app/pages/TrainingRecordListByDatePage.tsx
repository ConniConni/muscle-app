import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSelectDate } from "~/apiActions/TrainingRecord";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import TrainingRecordTableByDate from "~/components/features/top/TrainingRecordTableByDate";
import type { TrainingRecordWithName } from "~/type/training_record";

const TrainingRecordListByDatePage = () => {
  // URL から id を取得
  const { date } = useParams<{ date: string }>();
  const [trainingRecords, setTrainingRecords] = useState<
    TrainingRecordWithName[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (date != null) {
      (async () => {
        const result = await getSelectDate(date);
        if (result.success) {
          setTrainingRecords(result.data);
        } else {
          alert(`一覧取得に失敗しました。\n\n${result.error}`);
        }
      })();
    }
  }, []);
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>{date} 筋トレ実績</h1>
          <div>
            <TrainingRecordTableByDate
              date={date!}
              trainingRecord={trainingRecords}
              currentPage={currentPage}
              getTrainingRecord={getSelectDate}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrainingRecordListByDatePage;
