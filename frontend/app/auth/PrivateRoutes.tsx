import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  // 初回読み込み中の場合（認証状態を確認中）
  // Loadingを表示
  if (loading) {
    return <div>Loading...</div>;
  }

  // 読み込みが完了し、ユーザー情報が存在する場合 (ログイン済み)
  // 子ルート（保護されたページ）を表示
  if (user) {
    return <Outlet />;
  }

  // 読み込みが完了し、ユーザー情報が存在しない場合 (未ログイン)
  // ログインページへリダイレクト
  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
