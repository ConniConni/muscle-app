import type { TrainingRecord } from "~/type/training_record_type";

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TrainingList;
