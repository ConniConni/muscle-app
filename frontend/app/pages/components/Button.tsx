type Props = {
  buttonName: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  background?: string;
};

const Button = (prop: Props) => {
  return (
    <button
      onClick={prop.onClick}
      type={prop.type || "button"}
      style={{
        background: prop.background || "lightgrey",
        borderRadius: "10px",
        maxWidth: "250px",
        padding: "5px",
      }}
    >
      {prop.buttonName}
    </button>
  );
};
export default Button;
