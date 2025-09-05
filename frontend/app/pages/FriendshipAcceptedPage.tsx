import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getReceivedRequests,
  updateFriendshipStatus,
} from "~/apiActions/Friendship";
import Header from "~/components/common/Header";
import Sidebar from "~/components/common/Sidebar";
import TooltipIconButton from "~/components/parts/TooltipIconButton";
import type { FriendRequest } from "~/type/friendship";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AlertDialog from "~/components/common/AlertDialog";

const FriendshipAcceptedPage = () => {
  // 申請者一覧保持するuseState
  const [requestUsers, setRequestUsers] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  // ダイアログの状態を管理
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
  });

  const fetchRequestUsers = async () => {
    const result = await getReceivedRequests();
    if (result.success) {
      const userObject = result.data;
      setRequestUsers(userObject);
    } else {
      console.error(result.error);
      alert("検索結果の取得に失敗しました。");
    }
  };

  // ページにアクセスした時点で申請者一覧を読み込む
  useEffect(() => {
    fetchRequestUsers();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // ローディング表示
  }

  // ボタン押下時に対応するfriendshipIdを渡す
  const handleAccepted = async (friendshipId: number) => {
    const result = await updateFriendshipStatus(friendshipId, { status: 1 });
    if (result.success) {
      // 成功ダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "成功",
        message: `ユーザーID:
          のフレンド申請を承認しました。`,
      });
      // 承認に成功したらリストから該当の申請を削除する
      setRequestUsers((prevRequests) =>
        prevRequests.filter((request) => request.id !== friendshipId)
      );
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
                      <tr key={requestUser.id}>
                        <th className="requestUser-name-record">
                          {requestUser.requester.username}
                        </th>
                        <th className="requestUser-name-record">
                          <Box display="flex" gap={0.5}>
                            <TooltipIconButton
                              tooltipTitle="承認"
                              iconButtonBackgroundColor="royalblue"
                              iconButtonColor="white"
                              iconButtonHoverBackgroundColor="white"
                              iconButtonHoverColor="royalblue"
                              id={requestUser.id}
                              onClick={() => handleAccepted(id)}
                              IconComponent={CheckIcon}
                            />
                            <TooltipIconButton
                              tooltipTitle="拒否"
                              iconButtonBackgroundColor="tomato"
                              iconButtonColor="white"
                              iconButtonHoverBackgroundColor="white"
                              iconButtonHoverColor="tomato"
                              id={requestUser.id}
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
