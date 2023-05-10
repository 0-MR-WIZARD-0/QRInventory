import { Script } from "components/Basic/Scenario";
import styles from "./login.scenario.module.scss";

const AuthErrorScenarioComponent: React.FC = () => {
  return (
    <div className={styles.authError}>
      <h2>Авторизация</h2>
      <span>Произошла ошибка при авторизации</span>
    </div>
  );
};
export const AuthErrorScript: Script = {
  0: {
    content: AuthErrorScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};

const AuthResetScenarioComponent: React.FC = () => {
  return (
    <div className={styles.authReset}>
      <h2>Авторизация</h2>
      <p>Запрос на восстановление пароля отправлен администратору</p>
      <p>После рассмотрения заявки вам на почту будут отправлен временный пароль</p>
    </div>
  );
};
export const AuthResetScript: Script = {
  0: {
    content: AuthResetScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
