import styles from "./default.button.module.scss";

type DefaultButtonProps = {
  component: React.ReactNode;
  onSumbit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
};

const DefaultButton: React.FC<DefaultButtonProps> = ({ onSumbit, component }) => {
  return (
    <button className={styles.defaultButton} onClick={onSumbit}>
      {component}
    </button>
  );
};

export default DefaultButton;
