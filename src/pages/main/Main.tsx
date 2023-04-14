import AddAudience from "../../components/AddAudience";
import Search from "../../components/search";
import ViewAudience from "../../components/viewAudience";
import styles from "./main.module.scss";

const Main = () => {
  return (
    <main className={styles.wrapperMain}>
      <ViewAudience/>
      <div>
        <Search/>
        <AddAudience/>
      </div>
    </main>
  );
};

export default Main;
