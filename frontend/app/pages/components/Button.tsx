type Props = {
  onClick: () => void;
  buttonName: string;
  disabled?: boolean;
  background?: string;
};

const Button = (prop: Props) => {
  return (
    <button
      onClick={prop.onClick}
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
