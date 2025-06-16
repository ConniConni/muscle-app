import { useAuth } from "~/auth/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import TooltipIconButton from "../parts/TooltipIconButton";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  // ログアウトするとログイン画面へ遷移
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user, logout } = auth;
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
        {user && (
          <>
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
