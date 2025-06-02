import React from "react";
import BaseSelectionPulldown from "./BaseSelectionPulldown";
import type { PulldownSelectedValue } from "~/type/common";

type TargetSelectionPulldownProps = {
  name: string;
  options: PulldownSelectedValue[];
  value: number;
  handleValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// 種目選択のプルダウンを生成する関数コンポーネント
const TargetSelectionPulldown = ({
  name,
  options,
  value,
  handleValueChange,
}: TargetSelectionPulldownProps) => {
  return (
    <BaseSelectionPulldown
      optionId={name}
      filterVal={value}
      handleValueChange={handleValueChange}
      selectedValues={options || []}
    />
  );
};
export default TargetSelectionPulldown;
