import { useState } from "react";
import { useNavigate } from "react-router";
import { postUser } from "~/apiActions/SignUpApi";
import Header from "~/components/common/Header";
import { SignupForm } from "~/components/parts/form/SignupForm";
import type { SignupFormType } from "~/type/signup";

const SignupPage = () => {
  const [signupFormData, setSignupFormData] = useState<SignupFormType>({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    username: "",
  });
  const navigate = useNavigate();
  // キャンセルボタンクリック時に実行されるハンドラ関数を定義
  const handleClick = () => {
    setSignupFormData({
      userId: "",
      password: "",
      confirmPassword: "",
      email: "",
      confirmEmail: "",
      username: "",
    });
    navigate("/");
  };
  // ★ フォーム送信時に実行されるハンドラ関数を定義
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信によるページのリロードを防ぐ
    e.preventDefault();

    const response = await postUser(signupFormData);

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
          <SignupForm
            {...signupFormData}
            setFormData={setSignupFormData}
            onClick={handleClick}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
