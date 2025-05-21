import { useNavigate } from "react-router";
import Button from "./Button";

// サイドバーを生成する関数コンポーネント
const Sidebar = () => {
  const navigate = useNavigate();
  // トップ画面に戻る
  const backTopPage = () => {
    navigate("/");
  };
  // 登録画面に遷移
  const navigateToCreatePage = () => {
    navigate("/create");
  };
  // マスタ登録画面に遷移
  const navigateToManageMstMuscleCategoryPage = () => {
    navigate("/manage-mst-muscle-category");
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <Button onClick={backTopPage} buttonName="筋トレ実績へ" />
      </div>
      <div className="sidebar-content">
        <Button onClick={navigateToCreatePage} buttonName="新規登録" />
      </div>
      <div className="sidebar-content">
        <Button
          onClick={navigateToManageMstMuscleCategoryPage}
          buttonName="種目管理"
        />
      </div>
    </aside>
  );
};
export default Sidebar;
