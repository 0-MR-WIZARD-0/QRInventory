import { LoadingTransitionComponent } from "components/Basic/Loader";
import AvatarElement from "components/Complex/AvatarElement";
import { MenuBar } from "components/Complex/MenuBar";
import ProtectedComponent from "components/Protected/Component";
import api from "helpers/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "types/Item";
import { ImageState } from "types/UI";
import { roledUserEditDataBarOptions } from "types/User";
import styles from "./view.sub.item.module.scss";

const ItemComponent: React.FC<Item> = ({ article, id, imageId, name }) => {
  const [avatar, setAvatar] = useState<ImageState>(undefined);
  useEffect(() => {
    if (!imageId) {
      return setAvatar("");
    }

    (async () => {
      try {
        let imageBlob = (await api.get(`/image/${imageId}`, { responseType: "blob" })).data;
        let img = URL.createObjectURL(imageBlob);
        setAvatar(img);
      } catch (error) {
        setAvatar(null);
      }
    })();
  }, [imageId]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper} onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <AvatarElement img={avatar} />
          <button>тап сюда или на фото чтобы скопировать ссылку</button>
        </div>
        <div>
          <h1>{name}</h1>
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

const ViewItem = () => {
  const { id } = useParams();
  const [pageItemData, setPageItemData] = useState<Item | null | undefined>();
  useEffect(() => {
    (async () => {
      try {
        const itemResData = (await api.get("/item", { params: { id } })).data;
        setPageItemData(itemResData);
      } catch (error) {
        setPageItemData(null);
      }
    })();
  }, [id]);

  if (pageItemData === undefined) return <LoadingTransitionComponent />;
  if (pageItemData === null) return <b>произошла ошибка при загрузке предмета или он не найден</b>;
  return <ItemComponent {...pageItemData} />;
};

export default ViewItem;
