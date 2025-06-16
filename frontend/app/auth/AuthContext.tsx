// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: null | { userId: string; username: string };
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | { userId: string; username: string }>(
    null
  );
  const [loading, setLoading] = useState(true);

  const login = async (token: string) => {
    localStorage.setItem("access_token", token);
    // トークンからユーザー情報をデコード
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ userId: payload.sub, username: payload.username });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  useEffect(() => {
    // アプリ初回マウント時にlocalStorageからJWTトークンを取得
    const token = localStorage.getItem("access_token");
    if (token) {
      // トークンが存在する場合はログイン処理（ユーザー情報の復元）を実行
      // ログイン処理が完了したらloadingをfalseにする
      login(token).finally(() => setLoading(false));
    } else {
      // トークンがない場合はloadingをfalseにして認証チェック終了
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
