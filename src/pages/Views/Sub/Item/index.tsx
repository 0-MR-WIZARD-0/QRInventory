import { LoadingTransitionComponent } from "components/Basic/Loader";
import { MenuBar } from "components/Complex/MenuBar";
import ViewElement, { AvatarElement } from "components/Complex/ViewElement";
import ProtectedComponent from "components/Protected/Component";
import api from "helpers/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "types/Item";
import { ImageState } from "types/UI";
import { roledUserEditDataBarOptions } from "types/User";
import styles from "./view.sub.item.module.scss";

// const mockItem: Item = {
//   article: "Ш-504",
//   id: "1234-5678-9101-1121",
//   imageId: "",
//   name: "Стул обыкновенный"
// };

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
  const [pageItemData, setPageItemData] = useState<Item | null | undefined>(); // потом заменить на query, подгрузку из кеша?
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
  if (pageItemData === null) return <div>произошла ошибка при загрузке предмета или он не найден</div>;
  return <ViewElement component={<ItemComponent {...pageItemData} />} />;
};

export default ViewItem;
