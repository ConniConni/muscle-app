import { useEffect, useState } from "react";
import { getFriendsList } from "~/apiActions/Friendship";

import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import type { Friend } from "~/type/friendship";

const MyFriendsListPage = () => {
  // フレンド一覧保持するuseState
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  // ページにアクセスした時点でフレンド一覧を読み込む
  useEffect(() => {
    (async () => {
      const result = await getFriendsList();
      if (result.success) {
        setFriendsList(result.data);
      } else {
        alert(`一覧取得に失敗しました。\n\n${result.error}`);
      }
    })();
  }, []);
  console.log(friendsList);
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1 className="page-title">フレンド一覧</h1>
          {friendsList.length === 0 ? (
            <div>
              <p>まだフレンドはいません。</p>
              <p>フレンド申請してみましょう！</p>
            </div>
          ) : (
            <table>
              <tbody>
                {friendsList.map((friend) => {
                  return (
                    <tr key={friend.id}>
                      <th className="friend-name-record">{friend.username}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFriendsListPage;
