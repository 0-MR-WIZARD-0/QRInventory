import { LoadingTransitionComponent } from "components/Basic/Loader";
import AvatarElement from "components/Complex/AvatarElement";
import { MenuBar } from "components/Complex/MenuBar";
import ProtectedComponent from "components/Protected/Component";
import api from "helpers/axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "types/Item";
import { ImageState } from "types/UI";
import { roledItemEditDataBarOptions } from "types/User";
import styles from "./view.sub.item.module.scss";
import { fetchItemThunk } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import { useAppSelector } from "helpers/redux";
import { MainViewRoutes } from "types/Routes";
import { Scenario } from "components/Basic/Scenario";
import { DeleteItemConfirmation, SuccessConfirmationDeleteItem } from "./Scenario";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  const DeleteItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const deleteButtons = useRef(roledItemEditDataBarOptions(DeleteItemModalRef));

  return (
    <>
      <Scenario
        ref={DeleteItemModalRef}
        modalName='delete-item-confirmation'
        script={{
          0: { content: DeleteItemConfirmation, onSuccess: 1, onFailure: -1 },
          1: {
            content: SuccessConfirmationDeleteItem,
            props: { id },
            onFailure: -1,
            onSuccess: -1
          }
        }}
      />
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper} onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <AvatarElement img={avatar} />
          <button>тап сюда или на фото чтобы скопировать ссылку</button>
        </div>
        <div>
          <h1>{name}</h1>
          <p>{article}</p>
        </div>
      </div>
      <ProtectedComponent
        component={
          <div className={styles.menuBar}>
            <p>Панель управления предметом</p>
            <MenuBar barOptions={deleteButtons.current} />
          </div>
        }
      />
    </>
  );
};

const ViewItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAppSelector(state => state.viewItems);
  const [pageItemData, setPageItemData] = useState<Item | null | undefined>();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return navigate(`/${MainViewRoutes.items}`);
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageItemData(existing);
        else {
          let res = await dispatch(fetchItemThunk({ id }));

          if (res.meta.requestStatus === "rejected") {
            return navigate(`/${MainViewRoutes.cabinets}`);
          }

          return setPageItemData(res.payload as Item);
        }
      } catch (error) {
        return setPageItemData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageItemData === undefined) return <LoadingTransitionComponent />;
  if (pageItemData === null) return <b>Произошла ошибка при загрузке предмета или он не найден.</b>;
  return <ItemComponent {...pageItemData} />;
};

export default ViewItem;
