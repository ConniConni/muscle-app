import React from "react";
import type { PulldownSelectedValue } from "~/type/common";

type BaseSelectionPulldownProps = {
  optionId: string;
  filterVal: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedValues: PulldownSelectedValue[];
};

// プルダウンを生成する関数コンポーネント
const BaseSelectionPulldown = ({
  optionId,
  filterVal,
  onChange,
  selectedValues,
}: BaseSelectionPulldownProps) => {
  return (
    <select name={optionId} value={filterVal} onChange={onChange}>
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
