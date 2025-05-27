import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "~/config";
import type { exerciseCategory } from "~/type/exercise_category";

type BaseSelectionPulldownProps = {
  filterVal: number;
  handleValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  apiEndPoint: string;
};

// プルダウンを生成する関数コンポーネント
const BaseSelectionPulldown = ({
  filterVal,
  handleValueChange,
  apiEndPoint,
}: BaseSelectionPulldownProps) => {
  const [selectedValues, setSelectedValues] = useState<exerciseCategory[]>([]);
  const getOptionName = async () => {
    const response = await fetch(`${API_BASE_URL}/${apiEndPoint}`);
    const result = await response.json();
    setSelectedValues(result);
    console.log("エンドポイント: ", apiEndPoint, ": 取得結果", result);
  };

  useEffect(() => {
    getOptionName();
  }, [apiEndPoint]);

  return (
    <select name="exercise_id" value={filterVal} onChange={handleValueChange}>
      <option value="">選択してください</option>
      {selectedValues.map((value) => (
        <option key={value.id} value={value.id}>
          {value.name}
        </option>
      ))}
    </select>
  );
};
export default BaseSelectionPulldown;
