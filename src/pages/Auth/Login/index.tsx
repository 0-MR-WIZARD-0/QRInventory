import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultButton from "components/Basic/Buttons/Default";
import Input from "components/Basic/Input";
import styles from "styles/globalStyle.module.scss";
import { emailValidation, passwordValidation } from "validation";
import { Scenario } from "components/Basic/Scenario";
import { AuthErrorScript, AuthResetScript } from "./Scenario";
import { loginUserThunk } from "redux/actions/auth.actions";
import { useAppDispatch } from "redux/store";
import { FormProvider, useForm } from "react-hook-form";

const Login = () => {
  const methods = useForm({ mode: "onBlur" });

  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const authErrorModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const authResetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const onSubmit = methods.handleSubmit(async (data: any) => {
    let res = await dispatch(loginUserThunk(data));
    if (res.meta.requestStatus === "fulfilled") {
      navigator("/", { replace: true });
    }
  });

  return (
    <FormProvider {...methods}>
      <Scenario ref={authErrorModalRef} modalName='auth-error' script={AuthErrorScript} />
      <Scenario ref={authResetModalRef} modalName='auth-reset' script={AuthResetScript} />
      <main>
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <h2>Авторизация</h2>
            <p>Для продолжения необходимо ввести данные аккаунта</p>
            <form action='' method='post' className={styles.form}>
              <Input {...emailValidation}/>
              <Input {...passwordValidation}/>
              <DefaultButton component={<div>продолжить</div>} onSumbit={onSubmit} />
              <Link to={""} onClick={() => authResetModalRef.current?.createModal()}>
                Забыл(а) пароль
              </Link>
            </form>
          </div>
        </div>
      </main>
    </FormProvider>
  );
};

export default Login;
