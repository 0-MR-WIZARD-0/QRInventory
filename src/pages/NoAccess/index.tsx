import globalStyles from "../../styles/globalStyle.module.scss";
import classnames from "classnames";
import styles from "./noAccess.module.scss";
import { useAppSelector } from "helpers/redux";
import { Navigate } from "react-router-dom";

const NoAccessPage = () => {
  const { error } = useAppSelector(state => state.user);
  console.log(error);

  if (!error) return <Navigate to={"/"} />;

  return (
    <div className={classnames(globalStyles.containerWrapper, styles.noAccess)}>
      <h2 className={styles.title}>Нет доступа</h2>
      <span>У вас недостаточно прав для просмотра этой страницы, проверьте авторизацию</span>
    </div>
  );
};

export default NoAccessPage;
