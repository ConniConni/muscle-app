import { useState } from "react";
import Header from "~/components/common/Header";
import SignUpForm from "~/components/parts/SignUpForm";
import type { SignUpFormType } from "~/type/signup";

const SignupPage = () => {
  const [formData, setFormData] = useState<SignUpFormType>({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    username: "",
  });
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="content">
          <h1 className="page-title">ユーザー登録</h1>
          <SignUpForm {...formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
