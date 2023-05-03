import { MenuBar } from "components/Complex/MenuBar";
import { useAppSelector } from "helpers/redux";
import { Navigate /*useParams*/, useLocation, useParams } from "react-router-dom";
import { roledUserEditDataBarOptions, RoledMenuBarOptions, Roles, RolesNaming, User, roledCabinetEditDataBarOptions } from "types/User";
import BackButton from "components/Basic/Buttons/Back";
import globalStyles from "styles/globalStyle.module.scss";
import styles from "./view.sub.user.module.scss";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import ViewElement from "components/Complex/ViewElement";
import api from "helpers/axios";
import { useEffect, useState } from "react";
import ProtectedComponent from "components/Protected/Component";

const formatFullName = (name: string) => {
  return name
    .split(" ")
    .map((name, i) => (i !== 0 ? name[0] : name))
    .join(" ");
};

type ImageState = string | null | undefined;
const AvatarElement: React.FC<{ img: ImageState }> = ({ img }) => {
  switch (img) {
    case null: {
      return <div className={styles.noImage}>Произошла ошибка при загрузке фото</div>;
    }
    case undefined: {
      return <LoadingTransitionComponent />;
    }

    default:
      if (img?.length === 0 || typeof img !== "string") {
        return <div className={styles.noImage}>Нет изображения</div>;
      } else {
        return <img draggable={false} src={img as string} />;
      }
  }
};

const UserComponent: React.FC<User> = ({ avatarId, email, fullName, id, institutions, role }) => {
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
        <div className={styles.imageWrapper} onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <AvatarElement img={avatar} />
          <button>тап сюда или на фото чтобы скопировать ссылку</button>
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
            <MenuBar barOptions={roledUserEditDataBarOptions["admin"]} />
          </div>
        }
      />
    </>
  );
};

const ViewUser = () => {
  const { id } = useParams();
  const { userData } = useAppSelector(state => state.user);
  const [pageUserData, setPageUserData] = useState<User>();
  useEffect(() => {
    if (id === undefined) {
      setPageUserData(userData);
    } else {
      // взять из кеша или получить
      (async () => {
        const userResData = (await api.get("/user/search", { params: { id } })).data;
        setPageUserData(userResData);
      })();
    }
  }, [id]);

  if (!userData) return <Navigate to={"signin"} />;

  if (!pageUserData) return <LoadingTransitionComponent />;
  return <ViewElement component={<UserComponent {...pageUserData} />} />;
};

export default ViewUser;
