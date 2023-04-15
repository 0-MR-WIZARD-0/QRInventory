import ViewAudience from "../../components/ViewAudience";
import styles from "./main.module.scss"

const Main = () => {
  return (
    <main className={styles.wrapperMain}>
      <ViewAudience />
    </main>
  );
};

export default Main;
