// 認証ヘッダーを生成するヘルパー関数
export const getAuthHeaders = (): Record<string, string> => {
  // 基礎となるヘッダーのオブジェクトを定義
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("access_token");

  if (token) {
    // トークンがあれば、Authorizationヘッダーを追加
    headers["Authorization"] = `Bearer ${token}`;
  }
  // ヘッダーのオブジェクトを返す
  return headers;
};
