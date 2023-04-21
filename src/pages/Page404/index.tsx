import globalStyles from "../../styles/globalStyle.module.scss";
import classnames from "classnames";
import styles from "./page404.module.scss";

const Page404 = () => {
  return (
    <div className={classnames(globalStyles.containerWrapper, styles.page404)}>
      <h2 className={styles.title}>Страница не найдена</h2>
      <span>Проверьте адрес или свяжитесь с администратором вашего учереждения</span>
    </div>
  );
};

export default Page404;
