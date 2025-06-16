import { API_BASE_URL } from "~/config";
import type { LogIn } from "~/type/log_in";

// ユーザー認証api呼び出し関数
export const authLogIn = async (params: {
  userId: string;
  password: string;
}) => {
  if (params.userId && params.password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      if (response.status != 200) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      const result = await response.json();
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } else {
    const alertMessage: string[] = [];
    if (!params.userId) alertMessage.push("ユーザーIDを入力してください");
    if (!params.password) alertMessage.push("パスワードを入力してください");
    return { success: false, error: alertMessage.join("\n") };
  }
};
