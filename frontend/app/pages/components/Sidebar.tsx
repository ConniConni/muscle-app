import { useNavigate } from "react-router";
import Button from "./Button";

const Sidebar = () => {
  const navigate = useNavigate();
  const backTopPage = () => {
    navigate("/");
  };
  return (
    <aside className="sidebar">
      <Button onClick={backTopPage} buttonName="筋トレ実績へ" />
    </aside>
  );
};
export default Sidebar;
