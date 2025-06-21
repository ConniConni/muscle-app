import { useState } from "react";
import { useNavigate } from "react-router";
import { postUser } from "~/apiActions/signUpApi";
import Header from "~/components/common/Header";
import SignUpForm from "~/components/parts/SignUpForm";
import type { SignUpFormType } from "~/type/signup";

const SignupPage = () => {
  const [formData, setFormData] = useState<SignUpFormType>({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    username: "",
  });
  const navigate = useNavigate();
  // ★ フォーム送信時に実行されるハンドラ関数を定義
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信によるページのリロードを防ぐ
    e.preventDefault();

    const response = await postUser(formData);

    if (response.success) {
      alert("ユーザー登録が完了しました。ログインページに移動します。");
      navigate("/login");
    } else {
      alert(`登録に失敗しました。\n\n${response.error}`);
    }
  };
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="content">
          <h1 className="page-title">ユーザー登録</h1>
          <SignUpForm
            {...formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
