import { Link } from "react-router-dom";
import BackButton from "../../components/Buttons/Back";
import globalStyles from "../../styles/globalStyle.module.scss";
import styles from "./profile.module.scss";

const Profile = () => {
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
              <h3>Администратор</h3>
              <p>Зуннунов Борис</p>
              <p>Сергеевич</p>
              <p>test@mail.com</p>
            </div>
          </div>
        </div>
        <div className={styles.setting}>
          <p>Панель управления аккаунтом</p>
          <div>
            <button>Редактирование</button>
            <button>Выйти</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
