import { useState } from "react";

type Props = {
  buttonName: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  background?: string;
  hoverBackground?: string;
  hoverColor?: string;
};

// ボタンを生成する関数コンポーネント
const Button = (prop: Props) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  // disabled時のスタイルを定義
  const disabledStyle = {
    backgroundColor: "#ccc", // 背景を薄いグレーに
    color: "#666", // 文字色を濃いグレーに
    cursor: "not-allowed", // カーソルを「禁止」マークに
    border: "solid 1px #ccc",
  };

  // 通常時のスタイルを定義
  const enabledStyle = {
    color: isHovered ? prop.hoverColor || "white" : prop.color || "black",
    background: isHovered
      ? prop.hoverBackground || "darkgray"
      : prop.background || "lightgrey",
    border: `solid 1px ${prop.background || "lightgrey"}`,
    cursor: "pointer",
  };
  return (
    <button
      onClick={prop.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={prop.type || "button"}
      disabled={prop.disabled}
      style={{
        // 共通スタイル
        borderRadius: "10px",
        maxWidth: "250px",
        padding: "5px",
        margin: "5px",
        // disabledの状態に応じてスタイルを切り替える
        ...(prop.disabled ? disabledStyle : enabledStyle),
      }}
    >
      {prop.buttonName}
    </button>
  );
};
export default Button;
