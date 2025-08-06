import { API_BASE_URL } from "~/config";
import { getAuthHeaders } from "./apiHelper";

// フレンド一覧取得処理呼び出し関数
export const getFriendsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/friendship/friends`, {
      method: "GET",
      headers: getAuthHeaders(),
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
};
