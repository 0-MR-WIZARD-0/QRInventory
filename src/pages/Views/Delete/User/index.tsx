import DefaultButton from "components/Basic/Buttons/Default";
import styles from "./view.delete.user.module.scss";
import Input from "components/Basic/Input";
import { passwordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import { validatePasswordThunk } from "redux/actions/auth.actions";
import { useEffect, useRef, useState } from "react";
import { deleteUserThunk, fetchUserThunk } from "redux/actions/users.actions";
import { MainViewRoutes } from "types/Routes";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "redux/store";
import { User } from "types/User";
import { Scenario } from "components/Basic/Scenario";
import { CheckPasswordErrorScript, DeleteUserErrorScript } from "./Scenario";
import { useAction } from "helpers/redux";
import { DefaultErrors } from "redux/reducers/errors.reducer";

const DeleteUserComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addError } = useAction();

  const DeleteUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const CheckPasswordModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const [userInfo, setUserInfo] = useState<User>();

  const methods = useForm<{ password: string }>({ mode: "onBlur" });

  useEffect(() => {
    (async () => {
      if (!id) return addError({ type: "user", description: DefaultErrors.invalidId });
      const res = await dispatch(fetchUserThunk({ id }));
      if (res.meta.requestStatus === "fulfilled") return setUserInfo(res.payload);
      else {
        addError({ type: "user", description: DefaultErrors.invalidId });
        return navigate(-1);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteUser = async () => {
    if (userInfo && userInfo.id) {
      const res = await dispatch(deleteUserThunk({ id: userInfo.id }));

      if (res.meta.requestStatus === "fulfilled") return navigate(`/${MainViewRoutes.users}`);
      else return DeleteUserModalRef.current?.createModal();
    }
  };

  const onSubmit = methods.handleSubmit(async data => {
    const res = await dispatch(validatePasswordThunk({ password: data.password }));

    if (res.payload === true) return deleteUser();
    else CheckPasswordModalRef.current?.createModal();
  });

  return (
    <FormProvider {...methods}>
      <Scenario
        ref={DeleteUserModalRef}
        modalName='delete-user-error'
        script={DeleteUserErrorScript}
      />
      <Scenario
        ref={CheckPasswordModalRef}
        modalName='check-password-error'
        script={CheckPasswordErrorScript}
      />
      <div className={styles.wrapper}>
        <h3>Удаление пользователя {""}</h3>
        <p>Для продолжения необходимо ввести пароль от аккаунта</p>
        <Input {...passwordValidation} />
        <DefaultButton component={<p>Удалить пользователя</p>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

const DeleteUser: React.FC = () => {
  return <DeleteUserComponent />;
};

export default DeleteUser;
