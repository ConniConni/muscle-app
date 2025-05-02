type Props = {
  onClick: () => void;
  buttonName: string;
};

const Button = (props: Props) => {
  return <button onClick={props.onClick}>{props.buttonName}</button>;
};
export default Button;
