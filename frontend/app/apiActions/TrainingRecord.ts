import { API_BASE_URL } from "~/config";

// 筋トレ実績一覧取得処理呼び出し
export const getTrainingRecord = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/training-record/`);
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

// 絞り込み表示処理呼び出し
export const getSelectExerciseId = async (filterExercise: number) => {
  if (filterExercise != 0) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/training-record/?exercise_id=${filterExercise}`
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
  } else {
    return { success: false, error: "種目idが存在しません。" };
  }
};

// 日付での絞り込み表示処理呼び出し
export const getSelectDate = async (filterDate: string) => {
  if (filterDate != "") {
    try {
      const response = await fetch(
        `${API_BASE_URL}/training-record/?date=${filterDate}`
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
  } else {
    return {
      success: false,
      error: "筋トレ実績が記録された日付が存在しません。",
    };
  }
};

// 個別筋トレ記録取得API呼び出し関数
export const getTrainingRecordById = async (id: number) => {
  if (id) {
    try {
      const response = await fetch(`${API_BASE_URL}/training-record/${id}`);
      if (response.status != 200) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
        );
      }
      const result = await response.json();
      console.log("個別データ取得api結果:", result);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: "種目idが存在しません。" };
  }
};

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

// 筋トレ記録更新API呼び出し関数
export const updateTrainingRecord = async (params: {
  id: number;
  exercise_id: number;
  date: string;
  weight: number;
  count: number;
}) => {
  if (params.exercise_id && params.date && params.weight && params.count) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/training-record/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exercise_id: +params.exercise_id!,
            date: params.date,
            weight: +params.weight!,
            count: +params.count!,
          }),
        }
      );

      if (response.status != 200) {
        const errorData = await response.json();
        throw new Error(
          `HTTP ${errorData.statusCode} エラー \n${errorData.message}`
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

// 筋トレ記録削除API呼び出し関数
export const trainingRecordDelete = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/training-record/${id}`, {
      method: `DELETE`,
    });
    if (response.status != 200) {
      const errorData = await response.json();
      throw new Error(
        `HTTP ${errorData.statusCode} エラー\n${errorData.message}`
      );
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
