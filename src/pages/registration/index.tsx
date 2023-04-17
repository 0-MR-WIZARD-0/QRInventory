import styles from "../../styles/globalStyle.module.scss";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <main>
        <div 
        className={styles.wrapperRegistrationAndLogin}
        >
        
        <h2>Регистрация</h2>
        <p>Для продолжения необходимо ввести необходимые данные</p>
        <form action='' method='post' className='form'>

            <input type='text' placeholder='Имя' />

            <input type='text' placeholder='Фамилия' />

            <input type='text' placeholder='Отчество' />

            <input type='email' placeholder='info@mailaddress.com' />

            <input type='password' placeholder='••••••••••••' />

            <input type='submit' value='Продолжить' />

          <Link to="/signin">Уже имеется аккаунт</Link>
        </form>
        </div>
    </main>
  );
};

export default Registration;