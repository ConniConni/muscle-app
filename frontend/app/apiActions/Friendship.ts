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

// フレンド申請API呼び出し処理
export const createFriendRequest = async (params: {
  approvalUserId: number;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/friendship/requests`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(params),
    });
    if (response.status != 201) {
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

// フレンドシップ状態取得処理呼び出し関数
export const getFriendshipStatus = async (approvalUserId: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/friendship/${approvalUserId}`,
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

// フレンド申請一覧取得処理呼び出し関数
export const findReceivedRequests = async (userId: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/friendship/requests/received`,
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

// フレンドシップ状態更新（フレンド申請承認/拒否）処理呼び出し関数
export const updateFriendshipStatus = async (
  friendshipId: number,
  params: {
    status: number;
  }
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/friendship/${friendshipId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
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
};
