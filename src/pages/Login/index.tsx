import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultButton from "../../components/Buttons/Default";
import Input from "../../components/Input";
import api from "../../helpers/axios";
import styles from "../../styles/globalStyle.module.scss";
import { error, log } from "console";
// import axios from "axios"

type FormProps = {
  email: string;
  password: string;
};

const testData = process.env.NODE_ENV !== "production" ? { email: "test@mail.com", password: "any-password" } : { email: "", password: "" };

const Login = () => {
  const navigator = useNavigate();

  const [formState, setFormState] = useState<FormProps>(testData);
  //                              потом поменять на пустые значения
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => setFormState(state => ({ ...state, [e.target.id]: e.target.value }));
  const onSumbit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await api.post("/auth/login", formState);
    navigator("/", { replace: true });
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
