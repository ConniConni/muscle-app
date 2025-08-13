import { API_BASE_URL } from "~/config";
import { getAuthHeaders } from "./apiHelper";

// 検索パラメータを受け取るための型を定義
type SearchUserParams = {
  userId?: string;
};

// ユーザー検索処理呼び出し関数
export const getSearchedUsers = async (params: SearchUserParams) => {
  // URLSearchParamsオブジェクトを作成
  const query = new URLSearchParams();
  console.log("初期値", query.toString());

  // paramsに含まれる値だけをクエリに追加
  if (params.userId) {
    query.append("user_id", params.userId);
  }
  console.log("user_id", query.toString());

  try {
    const response = await fetch(
      `${API_BASE_URL}/user/search${
        query.toString() ? `?${query.toString()}` : ""
      }`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );
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
