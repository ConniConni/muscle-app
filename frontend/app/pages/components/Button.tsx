type Props = {
  onClick: () => void;
  buttonName: string;
  disabled?: boolean;
};

const Button = (props: Props) => {
  return <button onClick={props.onClick}>{props.buttonName}</button>;
};
export default Button;
