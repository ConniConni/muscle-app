import { useNavigate } from "react-router";
import Button from "./Button";

const Sidebar = () => {
  const navigate = useNavigate();
  const backTopPage = () => {
    navigate("/");
  };
  const navigateToCreatePage = () => {
    navigate("/create");
  };
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
