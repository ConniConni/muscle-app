import { useEffect, useMemo, useState } from "react";
import { getHolidayList } from "~/apiActions/holidaysApi";
import { getTrainingRecord } from "~/apiActions/TrainingRecord";
import type { TrainingRecordWithName } from "~/type/training_record";

// 日付を 'YYYY-MM-DD' 形式にフォーマットするヘルパー関数
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useCalendar = () => {
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  // トレーニング実施日を'YYYY-MM-DD' 形式でsetオブジェクトの形で保持
  const [trainingDates, setTrainingDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [holidayResult, trainingResult] = await Promise.all([
          getHolidayList(),
          getTrainingRecord(),
        ]);

        if (holidayResult.success) {
          setHolidays(holidayResult.data);
        }
        if (trainingResult.success) {
          const dates = trainingResult.data.map(
            (record: TrainingRecordWithName) => record.date.slice(0, 10)
          );
          setTrainingDates(new Set(dates));
        }
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // react-calendarの各日付に適用するCSSクラス名を返す関数を生成・メモ化
  const tileClassName = useMemo(() => {
    // holidaysかtrainingDatesのどちらかが変更されたときのみ実行
    return ({ date, view }: { date: Date; view: string }) => {
      // 現在の表示が月表示("month")でなければクラス名を付けず処理を終了
      if (view !== "month") return "";

      // dateを"YYYY-MM-DD" 形式の文字列に変換
      const dateStr = formatDate(date);
      // 祝日、トレーニング実施日に適用するCSSクラス名を格納するための空配列
      const classes = [];
      if (holidays[dateStr]) {
        classes.push("holiday");
      }
      if (trainingDates.has(dateStr)) {
        classes.push("is-training-record");
      }
      return classes.join(" ");
    };
  }, [holidays, trainingDates]);

  // holidays,trainingDatesどちらもに変更がないときは前回生成した関数を利用
  return { loading, tileClassName, formatDate };
};
