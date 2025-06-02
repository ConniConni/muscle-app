import { API_BASE_URL } from "~/config";

// 部位リストを取得処理呼び出し関数
export const getTargetAreaList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/target-area`);
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
