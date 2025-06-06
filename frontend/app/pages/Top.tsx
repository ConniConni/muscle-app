import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router";
import { getHolidayList } from "~/apiActions/holidaysApi";
import { getTrainingRecord } from "~/apiActions/TrainingRecord";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import type { TrainingRecordWithName } from "~/type/training_record";

// トップページを生成する関数コンポーネント
export function Top() {
  const [date, setDate] = useState<Date | null>(new Date()); // 初期値は今日の日付
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [trainingRecords, setTrainingRecords] = useState<
    TrainingRecordWithName[]
  >([]);
  const navigate = useNavigate();

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

  // 筋トレ実績一覧を取得
  useEffect(() => {
    (async () => {
      const result = await getTrainingRecord();
      if (result.success) {
        setTrainingRecords(result.data);
      }
    })();
  }, []);

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
    return isHoliday(date) ? "holiday" : "";
  };

  // 日付クリック時の処理
  const handleClickDay = (e: Date) => {
    setDate(e); // 選択した日をハイライト
    const formattedDate = formatDate(e);
    const isTrainingRecord = trainingRecords.some(
      (trainingRecord) =>
        (trainingRecord.date as unknown as string).split("T")[0] ===
        formattedDate
    ); // 画面の挙動に問題はなかったが、rainingRecord.dateがDate型であることが原因でsplitでエラーになったためas unknown as stringを追加
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
