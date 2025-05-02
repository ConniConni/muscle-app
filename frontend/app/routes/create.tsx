import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ登録" },
  ];
}
// 1 podtapiにデータを送る関数を定義する
// 2 console.logで入力した値が取れるか確認
// 3 fetch postのやり方で fetch APIで受け取り、postに送る

const createTraining = async (formData: FormData) => {
  if (
    formData.get("category_id") &&
    formData.get("date") &&
    formData.get("count")
  ) {
    const categoryId = formData.get("category_id");
    const date = formData.get("date");
    const count = formData.get("count");

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
  } else {
    return;
  }
};

export default function Create() {
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
    </div>
  );
}
