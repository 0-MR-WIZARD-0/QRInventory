import Input from "components/Basic/Input";
import styles from "./view.edit.user.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch } from "redux/store";
import { RejectResponsesUser, editUserThunk, fetchUserThunk } from "redux/actions/users.actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAction, useAppSelector } from "helpers/redux";
import { User } from "types/User";
import { MainViewRoutes } from "types/Routes";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import {
  emailValidation,
  fullNameValidation,
  newPasswordValidation,
  oldPasswordValidation
} from "validation";
import { useForm, FormProvider } from "react-hook-form";
import ImageElement from "components/Complex/ImageElement";

const UserComponent: React.FC<User> = ({ email, fullName, id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname.split("/");
  const { addError } = useAction();

  const methods = useForm<{
    fullName: string;
    email: string;
    oldPassword: string;
    newPassword: string;
  }>({ mode: "onBlur" });

  const [info, setInfo] = useState({
    fullName: fullName || "Токарев Виктор Александрович",
    email: email || "temp@mail.ru",
    oldPassword: "",
    newPassword: ""
  });

  const onSubmit = methods.handleSubmit(async data => {
    if (info.oldPassword.length && info.newPassword.length) {
      const res = await dispatch(
        editUserThunk({
          id,
          fullName: data.fullName,
          email: data.email,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        })
      );
      if (res.meta.requestStatus === "fulfilled")
        return navigate(location.slice(0, location.length - 1).join("/"));
      else
        return addError({
          type: "user",
          description:
            RejectResponsesUser.editUserError + " Возможно введен неверный старый пароль."
        });
    } else {
      const res = await dispatch(editUserThunk({ id, fullName: data.fullName, email: data.email }));
      if (res.meta.requestStatus === "fulfilled")
        return navigate(location.slice(0, location.length - 1).join("/"));
      else return addError({ type: "user", description: RejectResponsesUser.editUserError });
    }
  });

  return (
    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <FormProvider {...methods}>
          <div className={styles.wrapper}>
            <h3>Редактирование аккаунта {fullName}</h3>
            <div className={styles.wrapperEdit}>
              <ImageElement />
              <div>
                <Input
                  {...fullNameValidation}
                  value={info.fullName}
                  onChange={(e: any) => setInfo({ ...info, fullName: e.target.value })}
                />
                <Input
                  {...emailValidation}
                  value={info.email}
                  onChange={(e: any) => setInfo({ ...info, email: e.target.value })}
                />
                <Input
                  {...oldPasswordValidation}
                  value={info.oldPassword}
                  onChange={(e: any) => setInfo({ ...info, oldPassword: e.target.value })}
                />
                <Input
                  {...newPasswordValidation}
                  value={info.newPassword}
                  onChange={(e: any) => setInfo({ ...info, newPassword: e.target.value })}
                />
              </div>
            </div>
          </div>
        </FormProvider>
      }
    />
  );
};

const EditUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { userData } = useAppSelector(state => state.user);
  const { data } = useAppSelector(state => state.viewUsers);
  const { addError } = useAction();

  const [pageUserData, setPageUserData] = useState<User | null | undefined>();
  useEffect(() => {
    (async () => {
      if (!userData) return;

      try {
        let existing = data?.find(e => e.id === (id ?? userData.id));
        if (existing) return setPageUserData(existing);
        else {
          let res = await dispatch(fetchUserThunk({ id: id ?? userData.id }));

          if (res.meta.requestStatus === "rejected") {
            addError({ type: "user", description: RejectResponsesUser.fetchUserError });
            return navigate(`/${MainViewRoutes.users}`);
          }

          return setPageUserData(res.payload);
        }
      } catch (error) {
        return setPageUserData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (pageUserData === undefined) return <LoadingTransitionComponent />;
  if (pageUserData === null)
    return <b>Произошла ошибка при загрузке пользователя или он не найден.</b>;
  return <UserComponent {...pageUserData} />;
};

export default EditUser;
