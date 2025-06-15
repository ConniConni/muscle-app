import { useState } from "react";
import Header from "~/components/common/Header";
import Button from "~/components/parts/Button";

// ログイン画面を生成する関数コンポーネント
const LogInPage = () => {
  const [inputUserId, setInputUserId] = useState<string>("");
  const [inputPass, setInputPass] = useState<string>("");

  const handleSubmit = () => {};
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
                    value={inputUserId}
                    onChange={(e) => setInputUserId(e.target.value)}
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
                    value={inputPass}
                    onChange={(e) => setInputPass(e.target.value)}
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
export default LogInPage;
