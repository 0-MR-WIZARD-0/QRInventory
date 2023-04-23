import styles from "styles/globalStyle.module.scss";
import Navbar from "components/Complex/Navbar";
import ProtectedComponent from "components/Protected/Component";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className={styles.wrapperMain}>
      <ProtectedComponent component={<Navbar />} />
      <Outlet />
    </main>
  );
};

export default Main;
