import { useState } from "react";
import TrainingList from "./components/TrainingList";
import type { MuscleType } from "~/type/type";

export function Top() {
  const [muscle, setMuscle] = useState<MuscleType[]>([]);

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
      <TrainingList muscle={muscle} />
    </div>
  );
}
