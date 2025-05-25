import InputForm from "./InputForm";
import { useNavigate, useParams } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { API_BASE_URL } from "~/config";

// 筋トレ記録更新画面を生成する関数コンポーネント
const UpdatePage = () => {
  // URL から id を取得
  const { id } = useParams<{ id: string }>();

  // 筋トレ記録更新処理呼び出し
  const updateTraining = async (formData: FormData) => {
    const exerciseId = formData.get("exercise_id");
    const date = formData.get("date");
    const weight = formData.get("weight");
    const count = formData.get("count");
    if (exerciseId && date && count) {
      try {
        const response = await fetch(`${API_BASE_URL}/training-record/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exercise_id: +exerciseId!,
            date: date,
            weight: +weight!,
            count: +count!,
          }),
        });

        if (response.status != 200) {
          const errorData = await response.json();
          throw new Error(
            `HTTP ${errorData.statusCode} エラー \n${errorData.message}`
          );
        }
        alert("更新が完了しました。");
        backTopPage();
      } catch (error: any) {
        alert(`データの更新に失敗しました。\n\n${error.message}`);
      }
    } else {
      const alertMessage: string[] = [];
      if (!exerciseId) {
        alertMessage.push("トレーニングを選択してください");
      }
      if (!date) {
        alertMessage.push("実施日を選択してください");
      }
      if (!weight) {
        alertMessage.push("重量を入力してください");
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
            onClick={updateTraining}
            actionName="更新"
            color="white"
            background="royalblue"
            hoverColor="royalblue"
            hoverBackground="white"
          />
        </div>
      </div>
    </div>
  );
};
export default UpdatePage;
