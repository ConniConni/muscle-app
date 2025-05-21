import { useNavigate } from "react-router";
import InputForm from "./InputForm";
import Header from "./Header";
import Sidebar from "./Sidebar";

// 筋トレ実績登録画面を生成する関数コンポーネント
const PostTrainingDataPage = () => {
  const createTraining = async (formData: FormData) => {
    const categoryId = formData.get("category_id");
    const date = formData.get("date");
    const count = formData.get("count");
    // 筋トレ実績登録処理呼び出し
    if (categoryId && date && count) {
      try {
        const response = await fetch("http://localhost:3000/muscle/", {
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
        if (response.status != 201) {
          const errorData = await response.json();
          throw new Error(
            `HTTP ${errorData.statusCode} エラー\n${errorData.message} `
          );
        }
        alert("登録が完了しました。");
        backTopPage();
      } catch (error: any) {
        alert(`データの登録に失敗しました。\n\n${error.message}`);
      }
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
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <InputForm
            onClick={createTraining}
            actionName="登録"
            color="white"
            background="seagreen"
            hoverColor="seagreen"
            hoverBackground="white"
          />
        </div>
      </div>
    </div>
  );
};
export default PostTrainingDataPage;
