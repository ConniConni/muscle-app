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
      alert("ログインに成功しました。");
      // loginの完了をawaitしてから画面遷移
      await login(response.data.access_token);
    } else {
      alert(`ログインに失敗しました。\n\n${response.error}`);
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="content">
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
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
