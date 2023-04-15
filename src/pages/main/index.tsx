import ViewAudience from "../../components/viewAudience";
import styles from "./main.module.scss";

const Main = () => {
  return (
    <main 
    className={styles.wrapperMain}
    >
      <ViewAudience/>

    </main>
  );
};

export default Main;
