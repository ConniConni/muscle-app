import { useAuth } from "~/auth/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TooltipIconButton from "../parts/TooltipIconButton";
import { useNavigate } from "react-router";
import SearchBox from "../parts/searchbox/Searchbox";
import { useState } from "react";

const Header = () => {
  const [userKeyword, setUserKeyword] = useState<string>("");
  const navigate = useNavigate();
  // ログアウトするとログイン画面へ遷移
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // サインアップ画面へ遷移
  const handleSingUp = () => {
    navigate("/sign-up");
  };

  // ユーザー検索APIを呼び出す
  const handleSearchUser = async (searchText: string) => {
    // searchTextが空の場合は、APIを叩かずに結果を空にする
    if (!searchText.trim()) {
      setUserKeyword("");
      return;
    }
    // ユーザー検索結果画面へ遷移
    navigate(`/user/search?q=${encodeURIComponent(searchText)}`);
  };

  const { user, logout, loading } = useAuth();
  if (loading) return null; // ローディング中は何も表示しない
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5em 1em",
      }}
    >
      <div
        className="header-left"
        style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
      >
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
          <img
            src="/images/header_icon.png"
            alt="アプリアイコン"
            style={{ width: 32, height: 32, display: "inline-block" }}
          />
          筋トレ記録アプリ
        </h1>
      </div>
      <div
        className="header-right"
        style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
      >
        {/* 未サインイン状態時にサインアップボタンを表示 */}
        {!user && (
          <div>
            <TooltipIconButton
              tooltipTitle="サインアップ"
              iconButtonBackgroundColor="white"
              iconButtonColor="gray"
              iconButtonHoverBackgroundColor="gray"
              iconButtonHoverColor="white"
              onClick={handleSingUp}
              IconComponent={PersonAddIcon}
            />
          </div>
        )}
        {/* サインイン状態時にログインユーザーのニックネームとサインアウトボタンを表示 */}
        {user && (
          <>
            <div>
              <SearchBox
                userKeyword={userKeyword}
                setUserKeyword={setUserKeyword}
                handleSearchUser={handleSearchUser}
              />
            </div>
            <div>
              <span>ログインユーザー：{user.username}</span>
            </div>
            <div>
              <TooltipIconButton
                tooltipTitle="ログアウト"
                iconButtonBackgroundColor="white"
                iconButtonColor="gray"
                iconButtonHoverBackgroundColor="gray"
                iconButtonHoverColor="white"
                onClick={handleLogout}
                IconComponent={LogoutIcon}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
