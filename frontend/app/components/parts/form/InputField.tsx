type InputFieldProps = {
  label: React.ReactNode;
  name: string;
  type: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

// labelとidはinput要素の中身以外で使用するため明示的にpropsを受け取る
const InputField = ({
  label,
  id,
  className,
  ...inputProps
}: InputFieldProps) => {
  const inputId = id || inputProps.name;
  return (
    <div className={className}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} {...inputProps} />
    </div>
  );
};

export default InputField;
