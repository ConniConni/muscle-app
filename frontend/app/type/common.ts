// 種目名のプルダウンを表示する際に利用する型
// exercise_idに紐づくnameを表示する際に利用する
export type PulldownSelectedValue = {
  id: number;
  name: string;
};

// 入力フォームを表示する際に利用する型
export type InputFieldProps = {
  label: React.ReactNode;
  name: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

// ダイアログの状態を表す際に利用する型
export type DialogState = {
  open: boolean;
  title: string;
  message: string;
};

// AlertDialogコンポーネントのprops
export type AlertDialogProps = {
  dialog: DialogState;
  onClose: () => void;
};
