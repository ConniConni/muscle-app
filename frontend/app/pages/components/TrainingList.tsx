import type { TrainingRecode } from "~/type/training_recode_type";

const TrainingList = ({
  trainingRecode,
}: {
  trainingRecode: TrainingRecode[];
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="training-recode-header">種目名</th>
            <th className="training-recode-header">実施日</th>
            <th className="training-recode-header">回数</th>
          </tr>
        </thead>
        <tbody>
          {trainingRecode.map((c) => {
            const date = new Date(c.date);
            const formattedDate = date.toLocaleDateString("ja-JP");

            return (
              <tr key={c.id}>
                <th className="training-recode-cell">{c.name}</th>
                <th className="training-recode-cell">{formattedDate}</th>
                <th className="training-recode-cell">{c.count}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TrainingList;
