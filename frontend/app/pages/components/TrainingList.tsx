import type { TrainingRecord } from "~/type/training_record_type";
import Button from "./Button";

type TrainingRecordProps = {
  trainingRecord: TrainingRecord[];
};

const TrainingList = ({ trainingRecord }: TrainingRecordProps) => {
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
                  <Button onClick={() => {}} buttonName="削除" />
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
