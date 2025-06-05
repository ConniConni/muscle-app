import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";

// トップページを生成する関数コンポーネント
export function Top() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Calendar value={date} onClickDay={(e) => setDate(e)} />
        </div>
      </div>
    </div>
  );
}
