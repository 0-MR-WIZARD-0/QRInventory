import { LoadingTransitionComponent } from "components/Basic/Loader";
import { ImageState } from "types/UI";
import styles from "./avatar.element.module.scss";

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
        return <img className={styles.image} draggable={false} src={img} alt='аватар/превью элемента' />;
      }
  }
};

export default AvatarElement;
