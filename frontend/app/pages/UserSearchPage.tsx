import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getSearchedUsers } from "~/apiActions/User";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import type { Users } from "~/type/friendship";

const UserSearchPage = () => {
  // フレンド一覧保持するuseState
  const [usersList, setUsersList] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  // ★ URLのクエリパラメータを取得するためのフック
  const [searchParams] = useSearchParams();
  // ページにアクセスした時点でフレンド一覧を読み込む
  useEffect(() => {
    // ★ URLからクエリパラメータ 'q' の値を取得
    const query = searchParams.get("q");
    // クエリが存在する場合のみAPIを呼び出す
    console.log(query);
    if (query) {
      const fetchUsers = async () => {
        setLoading(true);
        const result = await getSearchedUsers({
          userId: query,
        });
        if (result.success) {
          setUsersList(result.data);
        } else {
          console.error(result.error);
          alert("検索結果の取得に失敗しました。");
        }
        setLoading(false);
      };
      fetchUsers();
    } else {
      // クエリがない場合は、何も表示しない
      setUsersList([]);
      setLoading(false);
    }
    // ★ searchParamsが変更されるたびに、このeffectを再実行する
  }, [searchParams]);
  if (loading) {
    return <div>Loading...</div>; // ローディング表示
  }
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">ユーザー検索結果</h1>
          {usersList.length === 0 ? (
            <div>
              <p>検索条件に一致するユーザーがいませんでした。</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <tbody>
                  {usersList.map((user) => {
                    return (
                      <tr key={user.id}>
                        <th className="user-name-record">{user.username}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserSearchPage;
