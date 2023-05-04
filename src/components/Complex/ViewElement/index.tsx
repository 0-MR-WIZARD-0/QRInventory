import BackButton from "components/Basic/Buttons/Back";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import ProtectedComponent from "components/Protected/Component";
import { ImageState } from "types/UI";
import styles from "./view.element.module.scss";

export const AvatarElement: React.FC<{ img: ImageState }> = ({ img }) => {
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
        return <img className={styles.image} draggable={false} src={img as string} />;
      }
  }
};

type ViewElementProps = {
  component: React.ReactNode;
};
const ViewElement: React.FC<ViewElementProps> = ({ component }) => {
  return (
    <div className={styles.viewElement}>
      <ProtectedComponent component={<BackButton />} />
      <main>{component}</main>
    </div>
  );
};

export default ViewElement;
