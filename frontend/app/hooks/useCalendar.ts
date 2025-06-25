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

  // useMemoを使って、計算結果をメモ化（パフォーマンス向上）
  const tileClassName = useMemo(() => {
    return ({ date, view }: { date: Date; view: string }) => {
      if (view !== "month") return "";

      const dateStr = formatDate(date);
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

  return { loading, tileClassName, formatDate };
};
