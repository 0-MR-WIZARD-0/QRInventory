import Input from "components/Basic/Input";
import styles from "./view.edit.user.module.scss";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "redux/store";
import { RejectResponsesUser, editUserThunk, fetchUserIdThunk } from "redux/actions/users.actions";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAction, useAppSelector } from "helpers/redux";
import { User } from "types/User";
import { MainViewRoutes } from "types/Routes";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import { emailValidation, fullNameValidation, newPasswordValidation, oldPasswordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import ImageElement from "components/Complex/ImageElement";
import editStyles from "components/Complex/Wrappers/EditPageWrapper/edit.page.wrapper.module.scss";
import { useImage } from "helpers/hooks";
import api from "helpers/axios";
import { imageUserThunk } from "redux/actions/image.actions";
import { RejectResponsesInstitution } from "redux/actions/institutions.actions";
import { Scenario } from "components/Basic/Scenario";
import { SuccesConfirmationEditUser } from "./Scenario";
import { PasswordConfirmation } from "components/Basic/Scenario/default";

export type EditUserData = {
  fullName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
};

const UserComponent: React.FC<User> = ({ email, fullName, id, avatarId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname.split("/");
  const institution = useAppSelector(state => state.institution);
  const { userData } = useAppSelector(state => state.user);
  const { addError, fetchUserThunk, searchUserThunk } = useAction();

  const methods = useForm<EditUserData>({
    mode: "onBlur",
    defaultValues: { fullName: fullName ?? "", email: email ?? "", oldPassword: "", newPassword: "" }
  });
  const imageMethods = useImage();

  const EditUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  useEffect(() => {
    (async () => {
      try {
        if (avatarId) {
          let imageBlob = (await api.get(`/image/${avatarId}`, { responseType: "blob" })).data;
          const imageURL = URL.createObjectURL(imageBlob);
          if (imageBlob) imageMethods.uploadImage(imageURL);
        }
      } catch (error) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = methods.handleSubmit(async data => {
    if (data.oldPassword.length && data.newPassword.length) {
      if (data.newPassword.length < 7) {
        return addError({
          type: "user",
          description: RejectResponsesUser.editUserError + ". Длина пароля минимум 8 знаков."
        });
      }

      const res = await dispatch(
        editUserThunk({
          id,
          ...data
        })
      );

      if (imageMethods.file !== undefined) {
        let res = await dispatch(imageUserThunk({ id, file: imageMethods.file }));
        if (res.meta.requestStatus === "rejected") {
          return addError({
            type: "user",
            description: RejectResponsesUser.editUserError + ". Произошла ошибка при загрузке фото."
          });
        }
      }

      if (res.meta.requestStatus === "fulfilled") {
        if (id === userData!.id) {
          await fetchUserThunk({ initial: false });
        } else {
          if (!institution.id) {
            return addError({
              type: "institution",
              description: RejectResponsesInstitution.notFound
            });
          }
          await searchUserThunk({ id, institution: institution.id, take: 1, skip: 0, searchVal: "" });
        }
        return navigate(location.slice(0, location.length - 1).join("/"));
      } else
        return addError({
          type: "user",
          description: RejectResponsesUser.editUserError + ". Возможно введен неверный старый пароль."
        });
    } else {
      // здесь вызывать модалку по подтверждению пароля, остальная логика идёт внутри модалки
      return EditUserModalRef.current?.createModal();
    }
  });

  return (
    <>
      <Scenario
        ref={EditUserModalRef}
        modalName='edit-user-confirmation'
        script={{
          0: { content: PasswordConfirmation, onSuccess: 1, onFailure: -1 },
          1: {
            content: SuccesConfirmationEditUser,
            props: { imageMethods, id, data: methods.getValues() as EditUserData },
            onFailure: -1,
            onSuccess: -1
          }
        }}
      />
      <EditPageWrapper
        onSubmit={onSubmit}
        component={
          <FormProvider {...methods}>
            <div className={styles.wrapper}>
              <h3>Редактирование аккаунта {fullName}</h3>
              <div className={styles.wrapperEdit}>
                <ImageElement {...imageMethods} />
                <div className={editStyles.editInputsWrapper}>
                  <Input {...fullNameValidation} />
                  <Input {...emailValidation} />
                  <Input {...oldPasswordValidation} />
                  <Input {...newPasswordValidation} />
                </div>
              </div>
            </div>
          </FormProvider>
        }
      />
    </>
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
    if (id) {
      (async () => {
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageUserData(existing);

        let res = await dispatch(fetchUserIdThunk({ id }));
        if (res.meta.requestStatus === "rejected") {
          return navigate(`/${MainViewRoutes.users}`);
        }
        return setPageUserData(res.payload);
      })();
    } else {
      return setPageUserData(userData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (!userData) return <Navigate to={"signin"} />;

  if (pageUserData === undefined) return <LoadingTransitionComponent />;
  if (pageUserData === null) return <b>Произошла ошибка при загрузке пользователя или он не найден.</b>;
  return <UserComponent {...pageUserData} />;
};

export default EditUser;
