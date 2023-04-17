import styles from "./header.module.scss";
import Icon from "../Icon";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();

  return (
    <header>
      <div className={styles.wrapperHeader}>
        <div
          className={styles._info}
          onClick={() => {
            navigate("/");
          }}>
          <Icon icon='logo' width={32} height={32} />
          <div>
            <h3>QRInventory</h3>
            <p>проект инвентаризации организаций</p>
          </div>
        </div>

        <p>
          Авторизация: <Link to='/profile'>Администратор</Link>
        </p>
      </div>
    </header>
  );
};

export default Header;
