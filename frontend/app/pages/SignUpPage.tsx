import { useState } from "react";
import { useNavigate } from "react-router";
import { postUser } from "~/apiActions/SignUpApi";
import AlertDialog from "~/components/common/AlertDialog";
import Header from "~/components/common/Header";
import SignupForm from "~/components/parts/form/SignupForm";
import type { DialogState } from "~/type/common";
import type { SignupFormType } from "~/type/signup";

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ダイアログの状態を管理するstate
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    title: "",
    message: "",
  });
  const navigate = useNavigate();
  // キャンセルボタンクリック時に実行されるハンドラ関数を定義
  const handleCancel = () => {
    navigate("/");
  };

  const handleSignup = async (formData: SignupFormType) => {
    setIsSubmitting(true); // 送信中にする(ボタンを無効化する)

    const response = await postUser(formData);

    setIsSubmitting(false); // 送信完了(ボタンを有効に戻す)

    if (response.success) {
      console.log("成功ダイアログ");
      // 成功ダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "ユーザー登録完了",
        message: "ログインページに移動します。",
      });
    } else {
      // エラーダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "ユーザー登録失敗",
        message: response.error,
      });
    }
  };
  // ダイアログの外をクリックしたときにダイアログを閉じる処理
  const handleCloseDialog = async () => {
    setDialog({ ...dialog, open: false });
    // 成功ダイアログを閉じた場合、ページ遷移する
    if (dialog.title === "ユーザー登録完了") {
      navigate("/login");
    }
  };
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="content content--centered">
          <h1 className="page-title">ユーザー登録</h1>
          <SignupForm
            onSubmit={handleSignup}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
          <AlertDialog dialog={dialog} handleCloseDialog={handleCloseDialog} />
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
