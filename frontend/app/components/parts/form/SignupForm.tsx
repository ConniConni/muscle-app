import { useState } from "react";
import type { SignupFormType } from "~/type/signup";
import InputField from "./InputField";
import Button from "../Button";
import PasswordInputField from "./PasswordInputField";

type SignupFormProps = {
  onSubmit: (data: SignupFormType) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const SignupForm = ({ onSubmit, onCancel, isSubmitting }: SignupFormProps) => {
  const [signupFormData, setSignupFormData] = useState<SignupFormType>({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    username: "",
  });

  // 入力値が変更されたときの共通ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(signupFormData); // 親に最終的なデータを渡す
  };

  return (
    <form className="signup-form-grid" onSubmit={handleFormSubmit}>
      <InputField
        className="form-row"
        label="ユーザーID"
        id="userId"
        name="userId"
        type="text"
        value={signupFormData.userId}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <PasswordInputField
        className="form-row"
        label="パスワード"
        id="password"
        name="password"
        value={signupFormData.password}
        placeholder="8文字以上・英大文字・英小文字・数字必須"
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <PasswordInputField
        className="form-row"
        label={
          <>
            パスワード
            <br />
            （確認用）
          </>
        }
        id="confirmPassword"
        name="confirmPassword"
        value={signupFormData.confirmPassword}
        placeholder="8文字以上・英大文字・英小文字・数字必須"
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <InputField
        className="form-row"
        label="メールアドレス"
        id="email"
        name="email"
        type="email"
        value={signupFormData.email}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <InputField
        className="form-row"
        label={
          <>
            メールアドレス
            <br />
            （確認用）
          </>
        }
        id="confirmEmail"
        name="confirmEmail"
        type="email"
        value={signupFormData.confirmEmail}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <InputField
        className="form-row"
        label="ニックネーム"
        id="username"
        name="username"
        type="text"
        value={signupFormData.username}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <div className="form-actions">
        <Button
          type="button"
          buttonName="キャンセル"
          onClick={onCancel}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          buttonName="登録"
          color="white"
          background="seagreen"
          hoverColor="seagreen"
          hoverBackground="white"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
export default SignupForm;
