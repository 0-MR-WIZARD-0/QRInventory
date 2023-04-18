import { Link } from "react-router-dom";
import styles from "../../styles/globalStyle.module.scss";

const Login = () => {
  return (
    <main>
      <div className={styles.wrapperRegistrationAndLogin}>
        <h2>Авторизация</h2>
        <p>Для продолжения необходимо ввести данные аккаунта</p>
        <form action='' method='post' className='form'>
            <input type='email' placeholder='info@mailaddress.com' />

            <input type='password' placeholder='••••••••••••' />

            <input type='submit' value='Продолжить' />

          <Link to="">Забыл(а) пароль</Link>
        </form>
      </div>
      {/* <div className={styles._reset}>
        <h2>Авторизация</h2>
        <p>Запрос на восстановление пароля отправлен администратору.</p>
        <p>После рассмотрения заявки вам на почту будут отправлен временный пароль</p>
      </div> */}
    </main>
  );
};

export default Login;