import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TrainingRecord } from "~/type/training_record_type";

type Props = {
  onClick: (formDate: FormData) => void;
  actionName: string;
};

const InputForm = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [trainingRecord, setTrainingRecord] = useState<TrainingRecord>({
    id: 0,
    name: "",
    date: new Date(),
    count: 0,
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/muscle/id=${id}`);
      const result = await response.json();
      console.log("api取得結果:", result);
      setTrainingRecord({ ...result });
    })();
  }, []);
  useEffect(() => {
    console.log("stateの値:", trainingRecord);
  }, [trainingRecord]);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = +e.target.value;
    setTrainingRecord({
      ...trainingRecord,
      count: newCount,
    });
  };

  return (
    <div>
      <h1>{props.actionName}ぺージ</h1>
      <form action={props.onClick}>
        <div>
          <select name="category_id">
            <option value="1">腹筋</option>
            <option value="2">腕立て</option>
            <option value="3">背筋</option>
          </select>
        </div>
        <div>
          <input type="date" name="date" />
        </div>
        <div>
          <input
            type="number"
            name="count"
            value={trainingRecord.count}
            onChange={handleCountChange}
          />
        </div>
        <button type="submit">{props.actionName}</button>
      </form>
    </div>
  );
};
export default InputForm;
