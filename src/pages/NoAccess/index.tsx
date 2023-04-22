import globalStyles from "../../styles/globalStyle.module.scss";
import classnames from "classnames";
import styles from "./noAccess.module.scss";

const NoAccessPage = () => {
  return (
    <div className={classnames(globalStyles.containerWrapper, styles.noAccess)}>
      <h2 className={styles.title}>Нет доступа</h2>
      <span>У вас недостаточно прав для просмотра этой страницы, проверьте авторизацию</span>
    </div>
  );
};

export default NoAccessPage;
