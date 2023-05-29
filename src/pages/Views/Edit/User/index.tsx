import Input from "components/Basic/Input";
import styles from "./view.edit.user.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch } from "redux/store";
import { editUserThunk, fetchUserThunk } from "redux/actions/users.actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "helpers/redux";
import { User } from "types/User";
import { MainViewRoutes } from "types/Routes";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import { emailValidation, fullNameValidation, passwordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import ImageElement from "components/Complex/ImageElement";

const UserComponent: React.FC<User> = ({ avatarId, email, fullName, id, role }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname.split("/");

  const methods = useForm({ mode: "onBlur" });

  const onSubmit = methods.handleSubmit(async data => {
    console.log("Пустое поле не будет правиться в базе данных");
    const res = await dispatch(editUserThunk({ id, fullName: data.fullName.length > 5 ? data.fullName : undefined, email: data.email.length > 7 ? data.email : undefined }));
    console.log(res);

    if (res.meta.requestStatus === "fulfilled") {
      console.log("Пользователь отредактирован");
      return navigate(location.slice(0, location.length - 1).join("/"));
    } else {
      console.log("Произошла ошибка при редактировании пользователя");
      console.log(res.payload);
    }
  });

  return (
    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <FormProvider {...methods}>
        <div className={styles.wrapper}>
          <h3>Редактирование аккаунта</h3>
          <div className={styles.wrapperEdit}>
            <ImageElement/>
            <div>
              <Input {...fullNameValidation} />
              <Input {...emailValidation} />
              <Input {...passwordValidation} label='старый пароль' />
              <Input {...passwordValidation} label='новый пароль' />
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
            console.log("Произошла ошибка при загрузке пользователя");
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
  if (pageUserData === null) return <b>произошла ошибка при загрузке пользователя или он не найден</b>;
  return <UserComponent {...pageUserData} />;
};

export default EditUser;
