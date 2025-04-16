import { useState } from "react";
type Muscles = {
  src: Muscle[];
};
type Muscle = {
  id: number;
  category_id: number;
  date: Date;
  count: number;
};

export function Top() {
  const [muscle, setMuscle] = useState<Muscle[]>([]);

  const getMuscle = async () => {
    const response = await fetch("http://localhost:3000/muscle/");
    const result = await response.json();
    setMuscle(result);
    console.log(result, "test");
  };

  return (
    <div className="top">
      <h1>筋トレ実績</h1>
      <button onClick={getMuscle}>一覧取得</button>
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
    </div>
  );
}
