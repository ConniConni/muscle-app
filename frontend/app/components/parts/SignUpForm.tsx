import Button from "./Button";
import type { SignUpFormType } from "~/type/signup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useState } from "react";

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
  // パスワードの表示状態を保持
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  // 入力値が変更されたときの共通ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // パスワード表示状態切り替えボタン用のハンドラ関数を追加
  const handleTogglePasswordVisibility = (
    fieldName: "password" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
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
        <div className="password-input-wrapper">
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            placeholder="8文字以上・英大文字・英小文字・数字必須"
            onChange={handleChange}
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => handleTogglePasswordVisibility("password")}
            edge="end"
          >
            {showPassword.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="confirmPassword">
          パスワード
          <br />
          （確認用）
        </label>
        <div className="password-input-wrapper">
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <IconButton
            aria-label="toggle confirm password visibility"
            onClick={() => handleTogglePasswordVisibility("confirmPassword")}
            edge="end"
          >
            {showPassword.confirmPassword ? (
              <VisibilityIcon />
            ) : (
              <VisibilityOffIcon />
            )}
          </IconButton>
        </div>
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
