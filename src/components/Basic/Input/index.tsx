import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "../Icon";
import styles from "./input.module.scss";

type InputProps = {
  label?: string;
  type: string;
  placeholder?: string;
  validation?: Object;
  name: string;
  value?: string;
  disabled?: boolean;
  onChange?: any;
};

export function findInputError(errors: any, name: string): { error?: { type: string; message: string; ref: any } } {
  const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
  return filtered;
}

export const isFormInvalid = (error: object) => {
  if (Object.keys(error).length > 0) return true;
  return false;
};

const Input: React.FC<InputProps> = ({ label, validation, name, type, placeholder, value, onChange }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (type === "password") setShowPassword(p => !p);
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          {...register(name, validation)}
          placeholder={placeholder}
          value={value}
          disabled={false}
          onChange={onChange}
          type={type !== "password" ? type : !showPassword ? "password" : "text"}
        />
        {type === "password" && (
          <button className={styles.passwordShowToggle} onClick={toggleShowPassword}>
            <Icon icon={showPassword ? "eye-password-show" : "eye-password-hide"} />
          </button>
        )}
        {label !== undefined && <label htmlFor={name}>{label}</label>}
      </div>
      {isInvalid && <span>{inputError.error?.message}</span>}
    </>
  );
};

export default Input;
