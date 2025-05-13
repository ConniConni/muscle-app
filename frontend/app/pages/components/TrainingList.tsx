import type { TrainingRecord } from "~/type/training_record_type";
import Button from "./Button";
import { useNavigate } from "react-router";

type TrainingRecordProps = {
  trainingRecord: TrainingRecord[];
  getTrainingRecord: () => void;
};

const TrainingList = ({
  trainingRecord,
  getTrainingRecord,
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
          {trainingRecord.map((c) => {
            const date = new Date(c.date);
            const formattedDate = date.toLocaleDateString("ja-JP");

            return (
              <tr key={c.id}>
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
    </div>
  );
};
export default TrainingList;
