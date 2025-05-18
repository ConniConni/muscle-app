type Props = {
  onClick: () => void;
  buttonName: string;
  disabled?: boolean;
  color?: string;
};

const Button = ({
  disabled = true,
  onClick,
  buttonName,
  color = "red",
}: Props) => {
  return <button onClick={onClick}>{buttonName}</button>;
};
export default Button;
