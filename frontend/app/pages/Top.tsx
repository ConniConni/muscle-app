import { useState } from "react";
import Result from "./components/Result";

type Muscle = {
  id: number;
  name: string;
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
      <Result muscle={muscle} />
    </div>
  );
}
