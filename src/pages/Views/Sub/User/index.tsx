import { MenuBar } from "components/Complex/MenuBar";
import { useAppSelector } from "helpers/redux";
import { Navigate /*useParams*/ } from "react-router-dom";
import { roledEditDataBarOptions, RoledMenuBarOptions, Roles, RolesNaming, User } from "types/User";
import BackButton from "components/Basic/Buttons/Back";
import globalStyles from "styles/globalStyle.module.scss";
import styles from "./view.sub.user.module.scss";

type ViewUserMenuBarProps = {
  userData: User;
};

export const ViewUserMenuBar: React.FC<ViewUserMenuBarProps> = ({ userData }) => {
  return (
    <div className={styles.setting}>
      <p>Панель управления аккаунтом</p>
      <MenuBar barOptions={roledEditDataBarOptions[userData.role as unknown as keyof RoledMenuBarOptions]} />
    </div>
  );
};

const ViewUser = () => {
  // const { id } = useParams();

  // if(id) fetch user by id
  // else fetch state user by id

  const { userData } = useAppSelector(state => state.user);
  if (!userData) return <Navigate to={"signin"} />;

  const formatFullName = (name: string) => {
    return name
      .split(" ")
      .map((name, i) => (i !== 0 ? name[0] : name))
      .join(" ");
  };

  return (
    <main className={globalStyles.wrapperMain}>
      <div className={styles.wrapperUser}>
        <div>
          <BackButton />
          <div className={styles.info}>
            <div className={styles.img}>
              <img alt='' />
            </div>
            <div>
              {userData.role === Roles.admin ? <h3>{RolesNaming.admin}</h3> : <h3>{formatFullName(userData.fullName)}</h3>}
              <p>{userData.email}</p>
            </div>
          </div>
        </div>
        <ViewUserMenuBar userData={userData} />
      </div>
    </main>
  );
};

export default ViewUser;
