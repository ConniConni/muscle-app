import { API_BASE_URL } from "~/config";
import { getAuthHeaders } from "./apiHelper";

// 部位リストを取得処理呼び出し関数
export const getTargetAreaList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/target-area`, {
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

export const getExerciseCategoryByTargetId = async (target_id: number) => {
  try {
    let response;
    if (target_id && target_id > 0) {
      response = await fetch(`/api/exercise-category/target/${target_id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
    } else {
      response = await fetch(`/api/exercise-category`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
    }
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
