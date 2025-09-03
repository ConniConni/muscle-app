import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getFriendshipIdByKeyOfAccepted,
  getReceivedRequests,
  updateFriendshipStatus,
} from "~/apiActions/Friendship";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import TooltipIconButton from "~/components/parts/TooltipIconButton";
import type { Friend } from "~/type/friendship";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AlertDialog from "~/components/common/AlertDialog";

const FriendshipAcceptedPage = () => {
  // 申請者一覧保持するuseState
  const [requestUsers, setRequestUsers] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  // ダイアログの状態を管理
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
  });
  // // フレンド承認の引数となるフレンドシップテーブルの対象idを保持するuseState
  // const [friendshipIdsByUserId, setFriendshipIdsByUserId] = useState<{
  //   [userId: number]: number;
  // }>({});

  // // 例えば、ユーザー一覧取得時や別API呼び出しで、申請者ごとのfriendshipIdを取得してstateにセット
  // useEffect(() => {
  //   const fetchAllFriendshipIds = async () => {
  //     const newMap: { [key: number]: number } = {};
  //     for (const user of requestUsers) {
  //       const res = await getFriendshipIdByKeyOfAccepted(user.id);
  //       console.log(`userId: ${user.id}`, res);
  //       if (res?.data?.id) {
  //         newMap[user.id] = res.data.id;
  //       }
  //     }
  //     setFriendshipIdsByUserId(newMap);
  //   };
  //   if (requestUsers.length > 0) fetchAllFriendshipIds();
  // }, [requestUsers]);

  // ページにアクセスした時点で申請者一覧を読み込む
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const result = await getReceivedRequests();
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
  console.log("requestUsers:" + requestUsers[0].friendshipId);

  // ボタン押下時に対応するfriendshipIdを渡す
  const handleAccepted = async () => {
    const friendshipId = requestUsers[0].friendshipId;
    console.log(friendshipId);
    const result = await updateFriendshipStatus(friendshipId, { status: 1 });
    if (result.success) {
      // 成功ダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "成功",
        message: `ユーザーID:
          のフレンド申請を承認しました。`,
      });
    } else {
      // エラーダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "エラー",
        message: `フレンド承認に失敗しました。\n\n${result.error}`,
      });
    }
  };
  const handleCloseDialog = async () => {
    setDialog({ ...dialog, open: false });
  };
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
                      <tr key={requestUser.friendshipId}>
                        <th className="requestUser-name-record">
                          {requestUser.username}
                        </th>
                        <th className="requestUser-name-record">
                          <Box display="flex" gap={0.5}>
                            <TooltipIconButton
                              tooltipTitle="承認"
                              iconButtonBackgroundColor="royalblue"
                              iconButtonColor="white"
                              iconButtonHoverBackgroundColor="white"
                              iconButtonHoverColor="royalblue"
                              id={requestUser.friendshipId}
                              onClick={() => handleAccepted()}
                              IconComponent={CheckIcon}
                            />
                            <TooltipIconButton
                              tooltipTitle="拒否"
                              iconButtonBackgroundColor="tomato"
                              iconButtonColor="white"
                              iconButtonHoverBackgroundColor="white"
                              iconButtonHoverColor="tomato"
                              id={requestUser.friendshipId}
                              onClick={() => {}}
                              IconComponent={ClearIcon}
                            />
                          </Box>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <AlertDialog dialog={dialog} handleCloseDialog={handleCloseDialog} />
      </div>
    </div>
  );
};
export default FriendshipAcceptedPage;
