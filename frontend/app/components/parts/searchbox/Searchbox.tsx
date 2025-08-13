import styles from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <div className={styles.search_box}>
      <input
        type="text"
        placeholder="ユーザーを検索"
        className={styles.search_input}
      />
      <button
        type="button"
        className={styles.search_button}
        aria-label="検索"
      ></button>
      <span className={styles.magnifying_glass}></span>
    </div>
  );
};

export default SearchBox;
