import { useEffect, useState } from "react";
import { getReceivedRequests } from "~/apiActions/Friendship";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import type { Friend } from "~/type/friendship";

const FriendshipAcceptedPage = () => {
  // 申請者一覧保持するuseState
  const [requestUsers, setRequestUsers] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  // ページにアクセスした時点で申請者一覧を読み込む
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const result = await getReceivedRequests(1);
      if (result.success) {
        const userObject = result.data;
        setRequestUsers(userObject);
      } else {
        console.error(result.error);
        alert("検索結果の取得に失敗しました。");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // ローディング表示
  }
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">フレンド承認画面</h1>
          {requestUsers.length === 0 ? (
            <div>
              <p>検索条件に一致するユーザーがいませんでした。</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <tbody>
                  {requestUsers.map((requestUser) => {
                    return (
                      <tr key={requestUser.id}>
                        <th className="requestUser-name-record">
                          {requestUser.username}
                        </th>
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
export default FriendshipAcceptedPage;
