import React, { useEffect, useState } from "react";
type CategorySelectionPulldownProps = {
  setFilterVal: React.Dispatch<React.SetStateAction<number>>;
};

type MstMuscleCategory = {
  id: number;
  name: string;
};

// 種目選択のプルダウンを生成する関数コンポーネント
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
      <option value="">選択してください</option>
      {trainingName.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};
export default CategorySelectionPulldown;
