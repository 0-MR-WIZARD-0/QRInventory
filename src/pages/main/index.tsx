import AddAudience from "../../components/AddAudience";
import Header from "../../components/Header";
import Search from "../../components/search";
import ViewAudience from "../../components/viewAudience";
import styles from "./main.module.scss";

const Main = () => {
  return (
    <main 
    className={styles.wrapperMain}
    >
      {/* <Header/> */}
      <ViewAudience/>
      {/* <div>
        <Search/>
        <AddAudience/>
      </div> */}
    </main>
  );
};

export default Main;
