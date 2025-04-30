import type { MuscleType } from "~/type/type";

const TrainingList = ({ muscle }: { muscle: MuscleType[] }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="muscle-header">種目名</th>
            <th className="muscle-header">実施日</th>
            <th className="muscle-header">回数</th>
          </tr>
        </thead>
        <tbody>
          {muscle.map((c) => {
            const date = new Date(c.date);
            const formattedDate = date.toLocaleDateString("ja-JP");

            return (
              <tr key={c.id}>
                <th className="muscle-cell">{c.name}</th>
                <th className="muscle-cell">{formattedDate}</th>
                <th className="muscle-cell">{c.count}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default TrainingList;
