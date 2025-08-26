import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";

const FriendshipAcceptedPage = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">フレンド承認画面</h1>
        </div>
      </div>
    </div>
  );
};
export default FriendshipAcceptedPage;
