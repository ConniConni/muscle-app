import React from "react";
import BaseSelectionPulldown from "./BaseSelectionPulldown";
import type { PulldownSelectedValue } from "~/type/common";

type TargetSelectionPulldownProps = {
  options: PulldownSelectedValue[];
  value: number;
  handleValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// 部位選択のプルダウンを生成する関数コンポーネント
const TargetSelectionPulldown = ({
  options,
  value,
  handleValueChange,
}: TargetSelectionPulldownProps) => {
  return (
    <BaseSelectionPulldown
      filterVal={value}
      handleValueChange={handleValueChange}
      selectedValues={options || []}
    />
  );
};
export default TargetSelectionPulldown;
