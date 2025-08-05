import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";

const MyFriendsListPage = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">フレンド一覧</h1>
        </div>
      </div>
    </div>
  );
};

export default MyFriendsListPage;
