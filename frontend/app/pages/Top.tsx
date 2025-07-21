import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router";
import { getSelectDate } from "~/apiActions/TrainingRecord";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import { useCalendar } from "~/hooks/useCalendar";

// トップページを生成する関数コンポーネント
export function Top() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // 初期値は今日の日付
  const navigate = useNavigate();
  // ★ カスタムフックからロジックとデータを取得
  const { loading, tileClassName, formatDate } = useCalendar();

  // 日付クリック時の処理
  const handleClickDay = async (date: Date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    const result = await getSelectDate(formattedDate);
    const isTrainingRecord = result.data && result.data.length > 0;
    if (isTrainingRecord) {
      navigate(`list/${formattedDate}`);
    } else {
      // 日付をクエリパラメータで渡して遷移
      navigate(`/create?date=${formattedDate}`);
    }
  };

  if (loading) {
    return <div>Loading Calendar...</div>; // ローディング表示を追加
  }

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">筋トレ実績</h1>
          <Calendar
            value={selectedDate}
            onClickDay={handleClickDay}
            calendarType="gregory" // 日曜始り、土日休日とするためにグレゴリオ歴を指定
            locale="en-US" // 日付の「日」の表示を消すために、英語ロケールを使用
            tileClassName={tileClassName}
          />
        </div>
      </div>
    </div>
  );
}
