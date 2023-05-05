import styles from "./add.new.module.scss";

type AddNewProps = {
  title: string;
  onClick: ([x]: any) => void;
};

const AddNewButton: React.FC<AddNewProps> = ({ onClick, title }) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      {title}
    </button>
  );
};

export default AddNewButton;
