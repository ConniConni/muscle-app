import InputForm from "./InputForm";
import { useNavigate, useParams } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const UpdatePage = () => {
  // URL から id を取得
  const { id } = useParams<{ id: string }>();

  const updateTraining = async (formData: FormData) => {
    const categoryId = formData.get("category_id");
    const date = formData.get("date");
    const count = formData.get("count");
    if (categoryId && date && count) {
      try {
        const response = await fetch(`http://localhost:3000/muscle/id/${id}`, {
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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `HTTP ${errorData.statusCode} エラー \n${errorData.message}`
          );
        }
        alert("更新が完了しました。");
        backTopPage();
      } catch (error: any) {
        alert(error.message);
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
          <InputForm onClick={updateTraining} actionName="更新" />
        </div>
      </div>
    </div>
  );
};
export default UpdatePage;
