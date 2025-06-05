import { useNavigate } from "react-router";
import Button from "../parts/Button";

// サイドバーを生成する関数コンポーネント
const Sidebar = () => {
  const navigate = useNavigate();
  // トップ画面に戻る
  const backTopPage = () => {
    navigate("/");
  };
  // 一覧画面に遷移
  const navigateToTrainingRecordListPage = () => {
    navigate("/list");
  };
  // 登録画面に遷移
  const navigateToTrainingRecordEditPage = () => {
    navigate("/create");
  };
  // マスタ登録画面に遷移
  const navigateToExerciseCategoryManagerPage = () => {
    navigate("/exercise-category");
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <Button onClick={backTopPage} buttonName="トップページへ" />
      </div>
      <div className="sidebar-content">
        <Button
          onClick={navigateToTrainingRecordListPage}
          buttonName="実績一覧"
        />
      </div>
      <div className="sidebar-content">
        <Button
          onClick={navigateToTrainingRecordEditPage}
          buttonName="新規登録"
        />
      </div>
      <div className="sidebar-content">
        <Button
          onClick={navigateToExerciseCategoryManagerPage}
          buttonName="種目管理"
        />
      </div>
    </aside>
  );
};
export default Sidebar;
