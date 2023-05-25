import { useNavigate, useLocation } from "react-router-dom";
import styles from "./edit.page.wrapper.module.scss";

type EditPageWrapperProps = {
  component: React.ReactNode;
  onSubmit: (x?: any) => any;
};

const EditPageWrapper: React.FC<EditPageWrapperProps> = ({ component, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");

  return (
    <main className={styles.wrapper}>
      {component}
      <div className={styles.bottomMenu}>
        <button className={styles.button} onClick={() => navigate(location.slice(0, location.length - 1).join("/"))}>
          отменить
        </button>
        <button className={styles.button} onClick={onSubmit}>
          сохранить
        </button>
      </div>
    </main>
  );
};

export default EditPageWrapper;
