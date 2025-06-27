import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// InputFieldと同様に、inputの標準属性を受け取る
type PasswordInputFieldProps = React.ComponentPropsWithRef<"input"> & {
  label: React.ReactNode;
};

const PasswordInputField = React.forwardRef<
  HTMLInputElement,
  PasswordInputFieldProps
>(({ label, id, ...props }, ref) => {
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="form-row">
      <label htmlFor={inputId}>{label}</label>
      <div className="password-input-wrapper">
        <input
          id={inputId}
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        {isClient && (
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        )}
      </div>
    </div>
  );
});

export default PasswordInputField;
