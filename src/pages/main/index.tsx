import axios from "axios";
import { useEffect } from "react";
import ViewAudience from "../../components/ViewAudience";
import api from "../../helpers/axios";
import styles from "../../styles/globalStyle.module.scss";
import Navbar from "../../components/Navbar";

const Main = () => {
  useEffect(() => {
    (async () => {
      console.log(process.env.NODE_ENV !== "production" ? process.env.REACT_APP_API_DEV_HOST : process.env.REACT_APP_API_HOST);

      const res = await api.get("/user/search", { params: { fio: "Фамилия" } });
      console.log(res);
    })();
  }, []);

  return (
    <main className={styles.wrapperMain}>
      <Navbar/>
      <ViewAudience />
    </main>
  );
};

export default Main;
