import Button from "./Button";
import type { SignUpFormType } from "~/type/signup";

// propsの型はSignUpFormTypeのプロパティをすべて継承し、setFormDataを追加
type SignUpFormProps = SignUpFormType & {
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormType>>;
};

const SignUpForm = ({
  userId,
  password,
  confirmPassword,
  email,
  confirmEmail,
  username,
  setFormData,
}: SignUpFormProps) => {
  // 入力値が変更されたときの共通ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <form className="signup-form-grid">
      <div className="form-row">
        <label htmlFor="userId">ユーザーID</label>
        <input
          type="text"
          name="userId"
          id="userId"
          value={userId}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="confirmPassword">
          パスワード
          <br />
          （確認用）
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="confirmEmail">
          メールアドレス
          <br />
          （確認用）
        </label>
        <input
          type="email"
          name="confirmEmail"
          id="confirmEmail"
          value={confirmEmail}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="username">ニックネーム</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <Button
          type="submit"
          buttonName="登録"
          color="white"
          background="seagreen"
          hoverColor="seagreen"
          hoverBackground="white"
        />
      </div>
    </form>
  );
};
export default SignUpForm;
