/*
課題1. setFilerValの型をanyから修正する
課題2. プルダウンをハードコーディングからmst_muscle_categoryから取得できるようにする
*/
import React, { useEffect, useState } from "react";
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
  const getMstMuscleCategory = async () => {
    const response = await fetch(`http://localhost:3000/mst-muscle-category`);
    const result = await response.json();
    setTrainingName(result);
    console.log("マスタ取得結果", result);
  };

  useEffect(() => {
    getMstMuscleCategory();
  }, []);

  return (
    <select name="category_id" onChange={(e) => setFilterVal(+e.target.value)}>
      {trainingName.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
export default CategorySelectionPulldown;
