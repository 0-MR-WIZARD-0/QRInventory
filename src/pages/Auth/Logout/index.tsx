import api from "helpers/axios";
import { useAction } from "helpers/redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "types/Routes";
import styles from "./logout.module.scss";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser, setLoading } = useAction();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await api.get("/auth/logout");
        setLoading(false);
        updateUser();
        navigate(`/${RoutesEnum.auth}/${RoutesEnum.signIn}`);
      } catch (error) {
        updateUser();
        setLoading(false);
        navigate(`/${RoutesEnum.auth}/${RoutesEnum.signIn}`);
      }
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3>Производится выход</h3>
    </div>
  );
};

export default Logout;
