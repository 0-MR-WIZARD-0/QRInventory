import ViewAudience from "components/ViewAudience";
import styles from "styles/globalStyle.module.scss";
import Navbar from "components/Navbar";

const Main = () => {
  return (
    <main className={styles.wrapperMain}>
      <Navbar />
      <ViewAudience />
    </main>
  );
};

export default Main;
