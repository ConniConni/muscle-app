import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // AuthContextのパスは適宜調整

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  // 初回読み込み中の場合（認証状態を確認中）
  if (loading) {
    // ローディングスピナーなどを表示するのが親切
    // ここでは何も表示しないか、ローディング画面コンポーネントを返す
    return <div>Loading...</div>; // または null
  }

  // 読み込みが完了し、ユーザー情報が存在する場合 (ログイン済み)
  if (user) {
    // 子ルート（保護されたページ）を表示
    return <Outlet />;
  }

  // 読み込みが完了し、ユーザー情報が存在しない場合 (未ログイン)
  // ログインページへリダイレクト
  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
