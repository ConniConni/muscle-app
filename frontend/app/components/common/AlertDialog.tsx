import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

type AlertDialogProps = {
  dialog: {
    open: boolean;
    title: string;
    message: string;
  };
  handleCloseDialog: () => Promise<void>;
};

const AlertDialog = (prop: AlertDialogProps) => {
  const { dialog, handleCloseDialog } = prop;
  return (
    <Dialog
      open={dialog.open} // stateに基づいて表示/非表示を制御
      onClose={handleCloseDialog} // ダイアログの外側をクリックした時にも閉じる
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        {/* styleでメッセージ内の改行(\n)を<br/>に変換して表示 */}
        <DialogContentText
          id="alert-dialog-description"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* ボタンを押したらダイアログを閉じる(autoFocusによってEnterキーでOK) */}
        <Button onClick={handleCloseDialog} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
