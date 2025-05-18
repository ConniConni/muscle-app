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

const Button = (prop: Props) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  return (
    <button
      onClick={prop.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={prop.type || "button"}
      style={{
        color: isHovered ? prop.hoverColor || "white" : prop.color || "black",
        background: isHovered
          ? prop.hoverBackground || "darkgray"
          : prop.background || "lightgrey",
        border: `solid 1px ${prop.background || "lightgrey"}`,
        borderRadius: "10px",
        maxWidth: "250px",
        padding: "5px",
        margin: "1px",
      }}
    >
      {prop.buttonName}
    </button>
  );
};
export default Button;
