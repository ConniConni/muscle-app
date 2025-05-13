/*
課題1. setFilerValの型をanyから修正する
課題2. プルダウンをハードコーディングからmst_muscle_categoryから取得できるようにする
*/
import React, { useState } from "react";
type CategorySelectionPulldownProps = {
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
};

type MstMuscleCategory = {
  id: number;
  name: string;
};

const CategorySelectionPulldown = ({
  setFilterVal,
}: CategorySelectionPulldownProps) => {
  const [trainingName, setTrainingName] = useState<MstMuscleCategory[]>([]);

  return (
    <select name="category_id" onChange={(e) => setFilterVal(+e.target.value)}>
      <option value="1">腹筋</option>
      <option value="2">腕立て</option>
      <option value="3">背筋</option>
    </select>
  );
};
export default CategorySelectionPulldown;
