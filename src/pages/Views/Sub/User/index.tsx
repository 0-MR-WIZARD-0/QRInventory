import { MenuBar } from "components/Complex/MenuBar";
import { useAppSelector } from "helpers/redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { roledUserDataBarOptions, roledUserEditDataBarOptions, Roles, User } from "types/User";
import styles from "./view.sub.user.module.scss";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import api from "helpers/axios";
import { useEffect, useRef, useState } from "react";
import ProtectedComponent from "components/Protected/Component";
import { ImageState } from "types/UI";
import AvatarElement from "components/Complex/AvatarElement";
import { fetchUserIdThunk } from "redux/actions/users.actions";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";
import { Scenario } from "components/Basic/Scenario";
import { SuccessConfirmationDeleteUser } from "./Scenario";
import { PasswordConfirmation } from "components/Basic/Scenario/default";

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

  const DeleteUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const editButtons = useRef(roledUserEditDataBarOptions(DeleteUserModalRef, userData?.role));
  return (
    <>
      <Scenario
        ref={DeleteUserModalRef}
        modalName='delete-user-confirmation'
        script={{
          0: { content: PasswordConfirmation, onSuccess: 1, onFailure: -1 },
          1: {
            content: SuccessConfirmationDeleteUser,
            props: { id },
            onFailure: -1,
            onSuccess: -1
          }
        }}
      />
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper} onClick={() => location.pathname !== "/profile" && navigator.clipboard.writeText(window.location.href)}>
          <AvatarElement img={avatar} />
          {location.pathname !== "/profile" && <button>тап сюда или на фото чтобы скопировать ссылку</button>}
        </div>
        <div className={styles.fio}>
          <h1>{role === Roles.admin ? "Администратор" : formatFullName(fullName)}</h1>
          <ProtectedComponent component={<span>{email}</span>} />
        </div>
      </div>
      {userData && (userData?.id !== id ? editButtons.current.length > 0 : roledUserDataBarOptions[userData!.role].length > 0) && (
        <ProtectedComponent
          component={
            <div className={styles.menuBar}>
              <p>Панель управления пользователем</p>
              {userData?.id !== id ? <MenuBar barOptions={editButtons.current} /> : <MenuBar barOptions={roledUserDataBarOptions[userData!.role]} />}
            </div>
          }
        />
      )}
    </>
  );
};

const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  if (pageUserData === undefined) return <LoadingTransitionComponent />;
  if (pageUserData === null) return <b>Произошла ошибка при загрузке пользователя или он не найден.</b>;
  return <UserComponent {...pageUserData} />;
};

export default ViewUser;
