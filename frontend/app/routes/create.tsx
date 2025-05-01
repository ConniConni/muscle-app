import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "筋トレ管理アプリ" },
    { name: "description", content: "筋トレ登録" },
  ];
}
// 関数を

export default function Create() {
  return (
    <div>
      <h1>新規登録ぺージ</h1>
      {/* SPAの時はreactはonSubmitを使用する */}
      <form onSubmit={() => {}}>
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
