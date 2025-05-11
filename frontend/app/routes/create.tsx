import Button from "~/pages/components/Button";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";
import Title from "~/utils/Title";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: Title.title,
      description: Title.description,
      content: Title.content,
    },
  ];
}
// 1 podtapiにデータを送る関数を定義する
// 2 console.logで入力した値が取れるか確認
// 3 fetch postのやり方で fetch APIで受け取り、postに送る

export default function Create() {
  const createTraining = async (formData: FormData) => {
    const categoryId = formData.get("category_id");
    const date = formData.get("date");
    const count = formData.get("count");
    if (categoryId && date && count) {
      await fetch("http://localhost:3000/muscle/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: +categoryId!,
          date: date,
          count: +count!,
        }),
      });
      alert("登録が完了しました。");
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
      <h1>新規登録ぺージ</h1>
      {/* SPAの時はreactはonSubmitを使用する */}
      <form action={createTraining}>
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
          <input type="number" name="count" placeholder="10" />
        </div>
        <button type="submit">登録</button>
      </form>
      <Button onClick={backTopPage} buttonName="戻る" />
    </div>
  );
}
