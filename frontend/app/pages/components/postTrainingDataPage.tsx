import { useNavigate } from "react-router";
import InputForm from "./InputForm";
import Button from "./Button";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PostTrainingDataPage = () => {
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
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <InputForm onClick={createTraining} actionName="登録" />
          <Button onClick={backTopPage} buttonName="戻る" />
        </div>
      </div>
    </div>
  );
};
export default PostTrainingDataPage;
