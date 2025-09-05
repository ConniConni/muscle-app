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
    try {
      setLoading(true);
      const result = await getReceivedRequests();
      if (result.success) {
        const userObject = result.data;
        setRequestUsers(userObject);
      } else {
        console.error(result.error);
        alert("検索結果の取得に失敗しました。");
      }
    } catch (error) {
      // 予期せぬエラーのハンドリング
      console.error("An unexpected error occurred:", error);
      alert("予期せぬエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  // ページにアクセスした時点で申請者一覧を読み込む
  useEffect(() => {
    fetchRequestUsers();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // ローディング表示
  }

  // フレンド承認
  const handleAccepted = async (friendshipId: number, username: string) => {
    const result = await updateFriendshipStatus(friendshipId, { status: 1 });
    if (result.success) {
      // 成功ダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "成功",
        message: `ユーザーID:${username}のフレンド申請を承認しました。`,
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
  // フレンド承認
  const handleDeclined = async (friendshipId: number, username: string) => {
    const result = await updateFriendshipStatus(friendshipId, { status: 2 });
    if (result.success) {
      // 成功ダイアログを表示するstateを更新
      setDialog({
        open: true,
        title: "成功",
        message: `ユーザーID: ${username}のフレンド申請を拒否しました。`,
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
        message: `フレンド申請拒否に失敗しました。\n\n${result.error}`,
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
              <p>現在フレンド申請は０件です。。</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <tbody>
                  {requestUsers.map((request) => {
                    return (
                      <tr key={request.id}>
                        <th className="requestUser-name-record">
                          {request.requester.username}
                        </th>
                        <th className="requestUser-name-record">
                          <Box display="flex" gap={0.5}>
                            <TooltipIconButton
                              tooltipTitle="承認"
                              iconButtonBackgroundColor="royalblue"
                              iconButtonColor="white"
                              iconButtonHoverBackgroundColor="white"
                              iconButtonHoverColor="royalblue"
                              id={request.id}
                              onClick={() =>
                                handleAccepted(
                                  request.id,
                                  request.requester.username
                                )
                              }
                              IconComponent={CheckIcon}
                            />
                            <TooltipIconButton
                              tooltipTitle="拒否"
                              iconButtonBackgroundColor="tomato"
                              iconButtonColor="white"
                              iconButtonHoverBackgroundColor="white"
                              iconButtonHoverColor="tomato"
                              id={request.id}
                              onClick={() =>
                                handleDeclined(
                                  request.id,
                                  request.requester.username
                                )
                              }
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
