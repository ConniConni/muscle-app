import { useState } from "react";
import TrainingList from "./components/TrainingList";
import type { MuscleType } from "~/type/muscle_type";
import Button from "./components/Button";

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
      <div>
        <Button onClick={() => {}} buttonName="新規登録" />
      </div>
      <div>
        <Button onClick={getMuscle} buttonName="一覧取得" />
      </div>
      <TrainingList muscle={muscle} />
    </div>
  );
}
