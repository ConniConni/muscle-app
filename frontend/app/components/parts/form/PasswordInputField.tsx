import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { InputFieldProps } from "~/type/common";

type PasswordInputFieldProps = InputFieldProps & {
  label: React.ReactNode;
};

const PasswordInputField = ({
  className,
  label,
  id,
  ...props
}: PasswordInputFieldProps) => {
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={className}>
      <label htmlFor={inputId}>{label}</label>
      <div className="password-input-wrapper">
        <input
          id={inputId}
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
};

export default PasswordInputField;
