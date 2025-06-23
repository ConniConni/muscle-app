import Button from "./Button";
import type { SignUpFormType } from "~/type/signup";

// propsの型はSignUpFormTypeのプロパティをすべて継承し、setFormDataとonClickを追加
type SignUpFormProps = SignUpFormType & {
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormType>>;
  onClick: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SignUpForm = ({
  userId,
  password,
  confirmPassword,
  email,
  confirmEmail,
  username,
  setFormData,
  onClick,
  onSubmit,
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
    <form className="signup-form-grid" onSubmit={onSubmit}>
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
          placeholder="8文字以上・英大文字・英小文字・数字必須"
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
        <Button type="button" buttonName="キャンセル" onClick={onClick} />
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
