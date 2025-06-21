import { API_BASE_URL } from "~/config";
import type { SignUpFormType } from "~/type/signup";

export const postUser = async (params: SignUpFormType) => {
  if (
    params.userId &&
    params.password &&
    params.email &&
    params.username &&
    params.password === params.confirmPassword &&
    params.email === params.confirmEmail
  ) {
    try {
      const { confirmPassword, confirmEmail, ...apiParams } = params;
      const response = await fetch(`${API_BASE_URL}/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiParams),
      });
      if (response.status !== 201) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } else {
    const alertMessage: string[] = [];
    if (!params.userId) alertMessage.push("ユーザーIDを入力してください");
    if (!params.password) alertMessage.push("パスワードを入力してください");
    if (!params.email) alertMessage.push("メールアドレスを入力してください");
    if (!params.username) alertMessage.push("ニックネームを入力してください");
    if (params.password !== params.confirmPassword)
      alertMessage.push("パスワードの入力が一致していません");
    if (params.email !== params.confirmEmail)
      alertMessage.push("メールアドレスの入力が一致していません");
    return { success: false, error: alertMessage.join("\n") };
  }
};
