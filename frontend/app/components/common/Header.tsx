const Header = () => {
  return (
    <header>
      <h1 style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <img
          src="/images/header_icon.png"
          alt="アプリアイコン"
          style={{ width: 32, height: 32, display: "inline-block" }}
        />
        筋トレ記録アプリ
      </h1>
    </header>
  );
};
export default Header;
