import React from "react";
import type { PulldownSelectedValue } from "~/type/common";

type BaseSelectionPulldownProps = {
  filterVal: number;
  handleValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedValues: PulldownSelectedValue[];
};

// プルダウンを生成する関数コンポーネント
const BaseSelectionPulldown = ({
  filterVal,
  handleValueChange,
  selectedValues,
}: BaseSelectionPulldownProps) => {
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
