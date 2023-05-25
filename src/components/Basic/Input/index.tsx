import { useFormContext } from "react-hook-form";
import styles from "./input.module.scss";

type InputProps = {
  label: string;
  type: string;
  placeholder?: string;
  validation: Object;
  name: string;
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

const Input: React.FC<InputProps> = ({label, type, placeholder, validation, name}) => {

  const { register, formState: {errors} } = useFormContext();

  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)
 
  return (
    <>
      <div className={styles.inputWrapper}>
        <input 
          placeholder={placeholder} 
          type={type}
          {...register(name, validation)}
        />
        {label !== undefined && <label htmlFor={name}>{label}</label>}
      </div>
      {isInvalid && <span>{inputError.error?.message}</span>}
    </>
  );
};

export default Input;
