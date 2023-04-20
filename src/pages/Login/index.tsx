import { useState } from "react";
import { Link } from "react-router-dom";
import DefaultButton from "../../components/Buttons/Default";
import Input from "../../components/Input";
import styles from "../../styles/globalStyle.module.scss";

type FormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const [formState, setFormState] = useState<FormProps>({ email: "", password: "" });
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => setFormState(state => ({ ...state, [e.target.id]: e.target.value }));
  const onSumbit = async () => {
    return console.log("success");
  };

  return (
    <main>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <h2>Авторизация</h2>
          <p>Для продолжения необходимо ввести данные аккаунта</p>
          <form action='' method='post' className='form'>
            <Input name='email' label='почта' value={formState.email} onChange={updateState} />
            <Input name='password' label='пароль' value={formState.password} onChange={updateState} type='password' />

            <DefaultButton component={<div>продолжить</div>} onSumbit={onSumbit} />

            <Link to=''>Забыл(а) пароль</Link>
          </form>
        </div>
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
