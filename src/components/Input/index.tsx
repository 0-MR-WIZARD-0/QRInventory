import styles from "./input.module.scss";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  name: string;
  type?: "password";

  label?: string;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ label, name, placeholder, onChange, value, type }) => {
  return (
    <div className={styles.inputWrapper}>
      <input id={name} placeholder={placeholder} value={value} onChange={onChange} type={type ?? "text"} />
      {label !== undefined && <label htmlFor={name}>{label}</label>}
    </div>
  );
};

export default Input;
