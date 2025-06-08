import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type TooltipIconButtonProps = {
  tooltipTitle: string;
  iconButtonBackgroundColor: string;
  iconButtonColor: string;
  iconButtonHoverBackgroundColor: string;
  iconButtonHoverColor: string;
  id: number;
  onClick: (id: number) => void;
  IconComponent: React.ElementType;
};

const TooltipIconButton: React.FC<TooltipIconButtonProps> = ({
  tooltipTitle,
  iconButtonBackgroundColor,
  iconButtonColor,
  iconButtonHoverBackgroundColor,
  iconButtonHoverColor,
  id,
  onClick,
  IconComponent,
}) => {
  return (
    <Tooltip
      title={tooltipTitle}
      placement="top"
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -16], // [水平方向, 垂直方向] 16pxだけ下にずらす
              },
            },
          ],
        },
      }}
    >
      <IconButton
        sx={{
          backgroundColor: iconButtonBackgroundColor,
          color: iconButtonColor,
          borderRadius: 1, // 枠を四角に変更
          "&:hover": {
            backgroundColor: iconButtonHoverBackgroundColor, // ホバー時色を反転
            color: iconButtonHoverColor,
            cursor: "pointer", //  ホバー時カーソルをポインターに変更
          },
        }}
        onClick={() => onClick(id)}
      >
        <IconComponent />
      </IconButton>
    </Tooltip>
  );
};
export default TooltipIconButton;
