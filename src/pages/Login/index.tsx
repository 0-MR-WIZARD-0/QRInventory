import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultButton from "components/Basic/Buttons/Default";
import Input from "components/Basic/Input";
import styles from "styles/globalStyle.module.scss";
import { NodeENV } from "types/App";
import { useLoginMutation } from "redux/queries/auth.queries";

type FormProps = {
  email: string;
  password: string;
};

const testData = process.env.NODE_ENV !== NodeENV.prod ? { email: "test@mail.com", password: "any-password" } : { email: "", password: "" };

const Login = () => {
  const navigator = useNavigate();
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  //                                                   потом поменять на пустые значения
  const [formState, setFormState] = useState<FormProps>(testData);
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => setFormState(state => ({ ...state, [e.target.id]: e.target.value }));
  const onSumbit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    login(formState);
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
    </main>
  );
};

export default Login;
