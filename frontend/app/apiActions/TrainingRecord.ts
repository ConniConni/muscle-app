import { API_BASE_URL } from "~/config";

// トレーニング記録登録API呼び出し関数
export const createTrainingRecord = async (params: {
  exercise_id: number;
  date: string;
  weight: number;
  count: number;
}) => {
  if (params.exercise_id && params.date && params.count) {
    try {
      const response = await fetch(`${API_BASE_URL}/training-record/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
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
    if (!params.exercise_id)
      alertMessage.push("部位と種目を正しく選択してください");
    if (!params.date) alertMessage.push("実施日を選択してください");
    if (!params.weight) alertMessage.push("重量を入力してください");
    if (!params.count) alertMessage.push("回数を入力してください");
    return { success: false, error: alertMessage.join("\n") };
  }
};
