type InputFieldProps = {
  label: string;
  name: string;
  type: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
};

// labelとidはinput要素の中身以外で使用するため明示的にpropsを受け取る
const InputField = ({ label, id, ...inputProps }: InputFieldProps) => {
  const inputId = id || inputProps.name;
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <div>
        <input id={inputId} {...inputProps} />
      </div>
    </div>
  );
};

export default InputField;
