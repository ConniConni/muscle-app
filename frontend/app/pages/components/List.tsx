type Muscle = {
  id: number;
  category_id: number;
  date: Date;
  count: number;
};
const List = ({ muscle }: { muscle: Muscle[] }) => {
  return (
    <div>
      {muscle.map((c) => {
        const date = new Date(c.date);
        const formattedDate = date.toLocaleDateString("ja-JP");

        return (
          <table key={c.id}>
            <thead>
              <tr>
                <th className="muscle-header">種目ID</th>
                <th className="muscle-header">実施日</th>
                <th className="muscle-header">回数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="muscle-cell">{c.category_id}</th>
                <th className="muscle-cell">{formattedDate}</th>
                <th className="muscle-cell">{c.count}</th>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};
export default List;
