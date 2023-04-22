import { MenuBar } from "components/MenuBar";
import { useAppSelector } from "helpers/redux";
import { Navigate } from "react-router-dom";
import { roledEditDataBarOptions, RoledMenuBarOptions, Roles, User } from "types/User";
import BackButton from "../../components/Buttons/Back";
import globalStyles from "../../styles/globalStyle.module.scss";
import styles from "./profile.module.scss";

type ProfileMenuBarProps = {
  userData: User;
};

const ProfileMenuBar: React.FC<ProfileMenuBarProps> = ({ userData }) => {
  return (
    <div className={styles.setting}>
      <p>Панель управления аккаунтом</p>
      <MenuBar barOptions={roledEditDataBarOptions[userData.role as unknown as keyof RoledMenuBarOptions]} />
    </div>
  );
};

const Profile = () => {
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
      <div className={styles.wrapperProfile}>
        <div>
          <BackButton />
          <div className={styles.info}>
            <div className={styles.img}>
              <img alt='' />
            </div>
            <div>
              {userData.role === Roles.admin ? <h3>{Roles.admin}</h3> : <h3>{formatFullName(userData.fullName)}</h3>}
              <p>{userData.email}</p>
            </div>
          </div>
        </div>
        <ProfileMenuBar userData={userData} />
      </div>
    </main>
  );
};

export default Profile;
