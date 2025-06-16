// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: null | { userId: string; username: string };
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | { userId: string; username: string }>(
    null
  );

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
    const token = localStorage.getItem("access_token");
    if (token) {
      // 初回読み込み時にユーザー情報を取得
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
