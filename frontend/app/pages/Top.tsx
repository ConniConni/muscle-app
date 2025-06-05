import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";

// トップページを生成する関数コンポーネント
export function Top() {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>トップページ</h1>
        </div>
      </div>
    </div>
  );
}
