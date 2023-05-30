import Icon from "components/Basic/Icon"
import { useImage } from "helpers/hooks"
import styles from "./image.element.module.scss"

const ImageElement = () => {

  const { changeHandler, fileDataURL } = useImage()

  return (
    <>
      {fileDataURL ? (
        <div className={styles.dropDownImage}>
          <img alt='изображение предмета' src={fileDataURL} draggable={false} />
          <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
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
  )
}

export default ImageElement