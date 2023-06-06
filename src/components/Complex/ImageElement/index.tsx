import Icon from "components/Basic/Icon";
import styles from "./image.element.module.scss";
import { useImage } from "helpers/hooks";

const ImageElement: React.FC<ReturnType<typeof useImage>> = ({ changeHandler, fileDataURL, uploadFile }) => {
  return (
    <>
      {fileDataURL ? (
        <div className={styles.dropDownImage}>
          <img alt='изображение предмета' src={fileDataURL} draggable={false} />
          <div className={styles.inputsWrapper}>
            <label>
              <Icon icon='upload' />
              <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
            </label>
            <button onClick={() => uploadFile(null)}>
              <Icon icon='remove-circle-cross' />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.dropDownPreview}>
          <Icon icon='image' />
          <label>
            <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
            <h5>Выбрать фотографию аккаунта</h5>
            <span>макс 5мб</span>
          </label>
        </div>
      )}
    </>
  );
};

export default ImageElement;
