import { Link } from "react-router-dom";
import styles from "./back.button.module.scss";

const BackButton: React.FC = () => {
  return (
    <Link to='/' className={styles.backButton}>
      назад на главную
    </Link>
  );
};

export default BackButton;
