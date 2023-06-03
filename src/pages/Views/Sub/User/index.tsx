import { MenuBar } from "components/Complex/MenuBar";
import { useAction, useAppSelector } from "helpers/redux";
import { Navigate /*useParams*/, useLocation, useNavigate, useParams } from "react-router-dom";
import { roledUserDataBarOptions, roledUserEditDataBarOptions, Roles, User } from "types/User";
import styles from "./view.sub.user.module.scss";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import api from "helpers/axios";
import { useEffect, useState } from "react";
import ProtectedComponent from "components/Protected/Component";
import { ImageState } from "types/UI";
import AvatarElement from "components/Complex/AvatarElement";
import { RejectResponsesUser, fetchUserThunk } from "redux/actions/users.actions";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";

const formatFullName = (name: string) => {
  return name
    .split(" ")
    .map((name, i) => (i !== 0 ? name[0] : name))
    .join(" ");
};

const UserComponent: React.FC<User> = ({ avatarId, email, fullName, id, role }) => {
  const { userData } = useAppSelector(state => state.user);

  const location = useLocation();

  const [avatar, setAvatar] = useState<ImageState>(undefined);
  useEffect(() => {
    if (!avatarId) {
      return setAvatar("");
    }

    (async () => {
      try {
        let imageBlob = (await api.get(`/image/${avatarId}`, { responseType: "blob" })).data;
        let img = URL.createObjectURL(imageBlob);
        setAvatar(img);
      } catch (error) {
        setAvatar(null);
      }
    })();
  }, [avatarId]);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.imageWrapper}
          onClick={() =>
            location.pathname !== "/profile" && navigator.clipboard.writeText(window.location.href)
          }>
          <AvatarElement img={avatar} />
          {location.pathname !== "/profile" && (
            <button>тап сюда или на фото чтобы скопировать ссылку</button>
          )}
        </div>
        <div className={styles.fio}>
          <h1>{role === Roles.admin ? "Администратор" : formatFullName(fullName)}</h1>
          <ProtectedComponent component={<span>{email}</span>} />
        </div>
      </div>
      <ProtectedComponent
        component={
          <div className={styles.menuBar}>
            <p>Панель управления пользователем</p>
            {userData?.id !== id ? (
              <MenuBar barOptions={roledUserEditDataBarOptions["admin"]} />
            ) : (
              <MenuBar barOptions={roledUserDataBarOptions["admin"]} />
            )}
          </div>
        }
      />
    </>
  );
};

const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addError } = useAction();
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

  if (!userData) return <Navigate to={"signin"} />;

  if (pageUserData === undefined) return <LoadingTransitionComponent />;
  if (pageUserData === null)
    return <b>Произошла ошибка при загрузке пользователя или он не найден.</b>;
  return <UserComponent {...pageUserData} />;
};

export default ViewUser;
