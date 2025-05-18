type Props = {
  onClick: () => void;
  buttonName: string;
  disabled?: boolean;
};

const Button = (prop: Props) => {
  return <button onClick={prop.onClick}>{prop.buttonName}</button>;
};
export default Button;
