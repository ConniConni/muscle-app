import { useParams } from "react-router";

const TrainingRecordListByDatePage = () => {
  // URL から id を取得
  const { date } = useParams<{ date: string }>();
  return <h1>テスト: {date} </h1>;
};
export default TrainingRecordListByDatePage;
