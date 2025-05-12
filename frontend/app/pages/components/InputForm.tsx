import { useEffect } from "react";
import { useParams } from "react-router";

type Props = {
  onClick: (formDate: FormData) => void;
  actionName: string;
};

const InputForm = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/muscle/id=${id}`);
      const result = await response.json();
      console.log(result);
    })();
  }, []);

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
          <input type="number" name="count" />
        </div>
        <button type="submit">{props.actionName}</button>
      </form>
    </div>
  );
};
export default InputForm;
