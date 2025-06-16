import { useState } from "react";
import { useNavigate } from "react-router";
import { authLogIn } from "~/apiActions/logInApi";
import Header from "~/components/common/Header";
import Button from "~/components/parts/Button";
import type { LoginForm } from "~/type/login";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({
    userId: "",
    password: "",
  });
  const navigate = useNavigate();

  const backTopPage = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // APIレスポンスを待って画面描画処理に移る
    e.preventDefault();
    const response = await authLogIn(formData);
    if (response.success) {
      localStorage.setItem("access_token", response.data.access_token);
      alert("ログインに成功しました。");
      backTopPage();
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
                    value={formData.userId}
                    onChange={(e) =>
                      setFormData({ ...formData, userId: e.target.value })
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
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
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
