import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";

// トップページを生成する関数コンポーネント
export function Top() {
  const [date, setDate] = useState<Date | null>(new Date()); // 初期値は今日の日付
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Calendar
            value={date}
            onClickDay={(e) => setDate(e)} // 選択した日にポインタを当てる
            calendarType="gregory" // 日曜始り、土日休日とするためにグレゴリオ歴を指定
            locale="en-US" // 日付の「日」の表示を消すために、英語ロケールを使用
          />
        </div>
      </div>
    </div>
  );
}
