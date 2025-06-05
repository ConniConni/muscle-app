import { Calendar } from "primereact/Calendar";
import { useState } from "react";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";

// トップページを生成する関数コンポーネント
export function Top() {
  const [date, setDate] = useState<any>();
  // カスタムロケール設定
  const customLocale = {
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Calendar value={date} onChange={(e) => setDate(e.value)} inline />
        </div>
      </div>
    </div>
  );
}
