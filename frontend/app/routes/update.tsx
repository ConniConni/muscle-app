import Button from "~/pages/components/Button";
import type { Route } from "../+types/root";
import { useNavigate, useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ登録" },
  ];
}

export default function Update() {
  // URL から id を取得
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  const updateTraining = async (formData: FormData) => {
    const categoryId = formData.get("category_id");
    const date = formData.get("date");
    const count = formData.get("count");
    if (categoryId && date && count) {
      await fetch(`http://localhost:3000/muscle/id=${idNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: +categoryId!,
          date: date,
          count: +count!,
        }),
      });
      alert("更新が完了しました。");
      backTopPage();
    } else {
      const alertMessage: string[] = [];
      if (!categoryId) {
        alertMessage.push("トレーニングを選択してください");
      }
      if (!date) {
        alertMessage.push("実施日を選択してください");
      }
      if (!count) {
        alertMessage.push("回数を入力してください");
      }
      alert(alertMessage.join("\n"));
    }
  };

  const navigate = useNavigate();
  const backTopPage = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>更新ぺージ</h1>
      <form action={updateTraining}>
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
        <button type="submit">更新</button>
      </form>
      <Button onClick={backTopPage} buttonName="戻る" />
    </div>
  );
}
