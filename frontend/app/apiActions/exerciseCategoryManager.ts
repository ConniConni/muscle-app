import { API_BASE_URL } from "~/config";

export const getExerciseCategory = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/exercise-category/with-target`
    );
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

export const createNewTraining = async (params: {
  target_id: number;
  name: string;
}) => {
  console.log(params.name);
  if (params.target_id > 0 && params.name.length > 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/exercise-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      console.log("params: ", params);
      if (response.status != 201) {
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
    if (!params.target_id) alertMessage.push("部位を選択してください");
    if (!params.name)
      alertMessage.push("入力画面には1文字以上の文字を入力してください");
    return { success: false, error: alertMessage.join("\n") };
  }
};
