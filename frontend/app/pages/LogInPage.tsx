import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authLogIn } from "~/apiActions/logInApi";
import { useAuth } from "~/auth/AuthContext";
import Header from "~/components/common/Header";
import Button from "~/components/parts/Button";
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
            <div>
              <label>
                ユーザーID
                <div>
                  <input
                    type="text"
                    value={loginFormData.userId}
                    onChange={(e) =>
                      setLoginFormData({
                        ...loginFormData,
                        userId: e.target.value,
                      })
                    }
                  />
                </div>
              </label>
            </div>
            <div>
              <label>
                パスワード
                <div>
                  <input
                    type="password"
                    value={loginFormData.password}
                    onChange={(e) =>
                      setLoginFormData({
                        ...loginFormData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              </label>
            </div>
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
