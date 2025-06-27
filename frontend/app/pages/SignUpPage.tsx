import { useState } from "react";
import { useNavigate } from "react-router";
import { postUser } from "~/apiActions/SignUpApi";
import Header from "~/components/common/Header";
import SignupForm from "~/components/parts/form/SignupForm";
import type { SignupFormType } from "~/type/signup";

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // キャンセルボタンクリック時に実行されるハンドラ関数を定義
  const handleCancel = () => {
    navigate("/");
  };

  const handleSignup = async (formData: SignupFormType) => {
    // クライアントサイドのバリデーション
    if (formData.password !== formData.confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    setIsSubmitting(true); // 送信中にする(ボタンを無効化する)

    // APIに不要なフィールドを取り除く
    const { confirmPassword, confirmEmail, ...apiParams } = formData;
    const response = await postUser(apiParams);

    setIsSubmitting(false); // 送信完了(ボタンを有効に戻す)

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
            onSubmit={handleSignup}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
