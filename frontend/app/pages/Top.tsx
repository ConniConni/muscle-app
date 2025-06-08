import { use, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router";
import { getHolidayList } from "~/apiActions/holidaysApi";
import { getSelectDate, getTrainingRecord } from "~/apiActions/TrainingRecord";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import type { TrainingRecordWithName } from "~/type/training_record";

// トップページを生成する関数コンポーネント
export function Top() {
  const [date, setDate] = useState<Date | null>(new Date()); // 初期値は今日の日付
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [dateAll, setDateAll] = useState<(string | null)[]>([]);
  const navigate = useNavigate();

  // 筋トレ実績がある日付を全件取得
  useEffect(() => {
    (async () => {
      const result = await getTrainingRecord();
      if (result.success) {
        setDateAll(
          result.data.map((record: TrainingRecordWithName) => record.date)
        );
      }
    })();
  }, []);

  // APIから祝日データを取得
  useEffect(() => {
    (async () => {
      const result = await getHolidayList();
      if (result.success) {
        setHolidays(result.data);
      }
    })();
  }, []);

  // 祝日かどうか判定
  const isHoliday = (date: Date) => {
    // Dateオブジェクトから「年」を取得
    const year = date.getFullYear();
    // Dateオブジェクトから「月」を2桁の文字列で取得
    const month = String(date.getMonth() + 1).padStart(2, "0");
    // Dateオブジェクトから「日」を2桁の文字列で取得
    const day = String(date.getDate()).padStart(2, "0");
    // 日本時間（JST）で「YYYY-MM-DD」形式の文字列を作成
    const dateStr = `${year}-${month}-${day}`;
    return dateStr in holidays;
  };

  // クリック時に日付を「yyyy-mm-dd」の形式で取得取得
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // カレンダーの日付セルにクラスを付与
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return "";
    const classes = [];
    // 祝日判定
    if (isHoliday(date)) {
      classes.push("holiday");
    }
    // 筋トレ記録判定
    const dateString = formatDate(date);
    if (dateAll.some((date) => date && date.slice(0, 10) === dateString)) {
      classes.push("is-training-record");
    }
    return classes.join(" ");
  };

  // 日付クリック時の処理
  const handleClickDay = async (e: Date) => {
    setDate(e); // 選択した日をハイライト
    const formattedDate = formatDate(e);
    const result = await getSelectDate(formattedDate);
    const isTrainingRecord = result.data && result.data.length > 0;
    if (isTrainingRecord) {
      navigate(`list/${formattedDate}`);
    } else {
      // 日付をクエリパラメータで渡して遷移
      navigate(`/create?date=${formattedDate}`);
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Calendar
            value={date}
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
