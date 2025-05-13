import Button from "~/pages/components/Button";
import InputForm from "./InputForm";
import { useNavigate, useParams } from "react-router";

const UpdatePage = () => {
  // URL から id を取得
  const { id } = useParams<{ id: string }>();

  const updateTraining = async (formData: FormData) => {
    const categoryId = formData.get("category_id");
    const date = formData.get("date");
    const count = formData.get("count");
    if (categoryId && date && count) {
      await fetch(`http://localhost:3000/muscle/${id}`, {
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
      <InputForm onClick={updateTraining} actionName="更新" />
      <Button onClick={backTopPage} buttonName="戻る" />
    </div>
  );
};
export default UpdatePage;
