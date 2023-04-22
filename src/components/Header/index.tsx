import styles from "./header.module.scss";
import Icon from "../Icon";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppSelector } from "helpers/redux";
import { Roles, User } from "types/User";
import { RoutesEnum } from "types/Routes";

const AuthComponent: React.FC<{ userData: User | undefined; loading: boolean }> = ({ userData, loading }) => {
  const location = useLocation();

  if (loading || location.pathname === `/${RoutesEnum.signIn}`) return <></>;

  if (userData !== undefined) {
    return (
      <p>
        Авторизация: <Link to='profile'>{Roles[userData.role as unknown as keyof typeof Roles]}</Link>
      </p>
    );
  } else {
    return (
      <p>
        <Link to={"signin"}>Авторизоваться</Link>
      </p>
    );
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { userData, loading } = useAppSelector(state => state.user);

  return (
    <header>
      <div className={styles.headerDesktop}>
        <div
          className={styles.info}
          onClick={() => {
            navigate("/");
          }}>
          <Icon icon='logo' width={32} height={32} />
          <div>
            <h3>QRInventory</h3>
            <p>проект инвентаризации организаций</p>
          </div>
        </div>
        <AuthComponent userData={userData} loading={loading} />
      </div>
      <div className={styles.headerMobile}>
        <div className={styles.headerMobileContent}>
          <div
            className={styles.info}
            onClick={() => {
              navigate("/");
            }}>
            <Icon icon='logo' width={32} height={32} />
            <div>
              <h3>QRInventory</h3>
              <p>проект инвентаризации организаций</p>
            </div>
          </div>
        </div>
        <AuthComponent userData={userData} loading={loading} />
      </div>
    </header>
  );
};

export default Header;
