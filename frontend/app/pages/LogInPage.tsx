import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as ButtonByMui,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authLogIn } from "~/apiActions/logInApi";
import { useAuth } from "~/auth/AuthContext";
import Header from "~/components/common/Header";
import Button from "~/components/parts/Button";
import InputField from "~/components/parts/form/InputField";
import type { LoginForm } from "~/type/login";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState<LoginForm>({
    userId: "",
    password: "",
  });
  // ダイアログの状態を管理
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
  });
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // APIレスポンスを待って画面描画処理に移る
    e.preventDefault();
    const response = await authLogIn(loginFormData);
    if (response.success) {
      localStorage.setItem("access_token", response.data.access_token);

      // 成功ダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "成功",
        message: "ログインに成功しました。",
      });
    } else {
      // エラーダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "エラー",
        message: "ログインに失敗しました。",
      });
    }
  };

  const handleCloseDialog = async () => {
    setDialog({ ...dialog, open: false });

    if (dialog.title === "成功") {
      const token = localStorage.getItem("access_token");
      if (token) {
        await login(token);
      }
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="content content--centered">
          <h1 className="page-title">ログイン</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="ユーザーID"
              name="userId"
              type="text"
              value={loginFormData.userId}
              onChange={handleChange}
            />
            <InputField
              label="パスワード"
              name="password"
              type="password"
              value={loginFormData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              buttonName="ログイン"
              color="white"
              background="royalblue"
              hoverColor="royalblue"
              hoverBackground="white"
            />
          </form>
          <Dialog
            open={dialog.open} // stateに基づいて表示/非表示を制御
            onClose={handleCloseDialog} // ダイアログの外側をクリックした時にも閉じる
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
            <DialogContent>
              {/* styleでメッセージ内の改行(\n)を<br/>に変換して表示 */}
              <DialogContentText
                id="alert-dialog-description"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {dialog.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* ボタンを押したらダイアログを閉じる(autoFocusによってEnterキーでOK) */}
              <ButtonByMui onClick={handleCloseDialog} autoFocus>
                OK
              </ButtonByMui>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
