import globalStyles from "../../styles/globalStyle.module.scss";
import classnames from "classnames";
import styles from "./noAccess.module.scss";
import { useAppSelector } from "helpers/redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoutesEnum } from "types/Routes";

const countdownSecs = 5;

const NoAccessPage = () => {
  const navigate = useNavigate();
  const { error } = useAppSelector(state => state.user);
  const [countdown, setCountdown] = useState<number>(countdownSecs);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown === 0) {
        navigate(`/${RoutesEnum.auth}/${RoutesEnum.signIn}`);
      } else {
        setCountdown(sec => --sec);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  if (!error) return <Navigate to={"/"} />;

  return (
    <div className={classnames(globalStyles.containerWrapper, styles.noAccess)}>
      <h2 className={styles.title}>Нет доступа</h2>
      <span>У вас недостаточно прав для просмотра этой страницы, проверьте авторизацию</span>
      <div>
        Редирект произойдёт через <b>{countdown}</b> сек...
      </div>
    </div>
  );
};

export default NoAccessPage;
