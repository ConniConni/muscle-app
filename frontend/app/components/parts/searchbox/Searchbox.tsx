import styles from "./SearchBox.module.css";

type Props = {
  userKeyword: string;
  setUserKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearchUser: (searchText: string) => Promise<void>;
};

const SearchBox = (prop: Props) => {
  return (
    <div className={styles.search_box}>
      <input
        type="text"
        placeholder="ユーザーを検索"
        className={styles.search_input}
        value={prop.userKeyword}
        onChange={(e) => prop.setUserKeyword(e.target.value)}
      />
      <button
        type="button"
        className={styles.search_button}
        aria-label="検索"
        onClick={() => prop.handleSearchUser(prop.userKeyword)}
      ></button>
      <span className={styles.magnifying_glass}></span>
    </div>
  );
};

export default SearchBox;
