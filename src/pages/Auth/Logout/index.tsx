import { useAction } from "helpers/redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "types/Routes";
import styles from "./logout.module.scss";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logoutUserThunk } = useAction();

  useEffect(() => {
    logoutUserThunk();
    navigate(`/${RoutesEnum.auth}/${RoutesEnum.signIn}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutUserThunk, navigate]);

  return (
    <div className={styles.wrapper}>
      <h3>Производится выход</h3>
    </div>
  );
};

export default Logout;
