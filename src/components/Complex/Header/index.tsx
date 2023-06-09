import styles from "./header.module.scss";
import Icon from "../../Basic/Icon";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppSelector } from "helpers/redux";
import { RolesNaming, User } from "types/User";
import { RoutesEnum } from "types/Routes";
import { useState } from "react";

import { Transition } from "react-transition-group";
import { TransitionStyles } from "types/UI";

type AuthComponentProps = {
  userData: User | undefined;
  loading: boolean;
  mobileShown?: boolean;
};

const AuthComponent: React.FC<AuthComponentProps> = ({ userData, loading, mobileShown }) => {
  const location = useLocation();

  const transitionStyles: TransitionStyles = {
    entering: { opacity: 0, transform: "translateY(0px)" },
    entered: { opacity: 1, transform: "translateY(70px)" },
    exiting: { opacity: 0, transform: "translateY(0px)" },
    exited: { opacity: 0 }
  };

  if (loading || location.pathname === `/${RoutesEnum.auth}/${RoutesEnum.signIn}`) return <></>;

  return (
    <Transition timeout={100} in={mobileShown ?? true}>
      {state => (
        <p style={mobileShown !== undefined ? { ...transitionStyles[state as keyof TransitionStyles] } : {}}>
          {userData !== undefined ? (
            <>
              Авторизация: <Link to='profile'>{RolesNaming[userData.role as unknown as keyof typeof RolesNaming]}</Link>
            </>
          ) : (
            <>
              <Link to={`/${RoutesEnum.auth}/${RoutesEnum.signIn}`}>Авторизоваться</Link>
            </>
          )}
        </p>
      )}
    </Transition>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signinPage = location.pathname === `/${RoutesEnum.auth}/${RoutesEnum.signIn}`;

  const { userData, loading } = useAppSelector(state => state.user);

  const [mobileAuthComponentShown, setMobileAuthComponentShown] = useState<boolean>(false);
  const transitionStyles: TransitionStyles = {
    entering: { marginBottom: 10 },
    entered: { marginBottom: 40 },
    exiting: { marginBottom: 10 },
    exited: { marginBottom: 10 }
  };

  return (
    <header>
      <div className={styles.headerDesktop}>
        <div className={styles.info} onClick={() => navigate("/")}>
          <Icon icon='logo' width={32} height={32} />
          <div>
            <h3>QRInventory</h3>
            <p>проект инвентаризации организаций</p>
          </div>
        </div>
        <AuthComponent userData={userData} loading={loading} />
      </div>
      <Transition timeout={50} in={mobileAuthComponentShown}>
        {state => (
          <div onClick={() => setMobileAuthComponentShown(prev => !prev)} className={styles.headerMobile} style={signinPage !== true ? { ...transitionStyles[state as keyof TransitionStyles] } : {}}>
            <div className={styles.headerMobileContent}>
              <div className={styles.info}>
                <Icon icon='logo' width={32} height={32} />
                <div>
                  <h3>QRInventory</h3>
                  <p>проект инвентаризации организаций</p>
                </div>
              </div>
            </div>
            <AuthComponent userData={userData} loading={loading} mobileShown={mobileAuthComponentShown} />
          </div>
        )}
      </Transition>
    </header>
  );
};

export default Header;
