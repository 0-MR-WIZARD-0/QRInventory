import AddAudience from "../../components/AddAudience";
import ViewAudience from "../../components/viewAudience";
import styles from "./main.module.scss";

const Main = () => {
  return (
    <main className={styles.main}>
      <ViewAudience/>
      <AddAudience/>
    </main>
  );
};

export default Main;
