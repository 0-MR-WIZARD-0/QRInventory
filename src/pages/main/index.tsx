import styles from "styles/globalStyle.module.scss";
import Navbar from "components/Complex/Navbar";
import ProtectedComponent from "components/Protected/Component";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Main = () => {
  // const { data, isLoading, isFetching } = useGetCabinetQuery({ cabinetNumberString: "326" });

  // useEffect(() => {
  //   if (!isFetching && !isLoading) {
  //     console.log(data);
  //   }
  // }, [isLoading, isFetching]);

  return (
    <main className={styles.wrapperMain}>
      <ProtectedComponent component={<Navbar />} />
      <Outlet />
    </main>
  );
};

export default Main;
