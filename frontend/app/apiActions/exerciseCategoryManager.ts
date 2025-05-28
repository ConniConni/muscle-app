import { API_BASE_URL } from "~/config";

export const getExerciseCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/exercise-category`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
      );
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    alert(`マスタ一覧の取得に失敗しました。\n\n${error.message}`);
  }
};
