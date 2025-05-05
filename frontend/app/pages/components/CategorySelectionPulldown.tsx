const CategorySelectionPulldown = ({ setFilterVal }: any) => {
  return (
    <select name="category_id" onChange={(e) => setFilterVal(e.target.value)}>
      <option value="1">腹筋</option>
      <option value="2">腕立て</option>
      <option value="3">背筋</option>
    </select>
  );
};
export default CategorySelectionPulldown;
