import Icon from "components/Basic/Icon"
import styles from "./image.element.module.scss"
import { useEffect, useState } from "react";
import { useAppDispatch } from "redux/store";
import { useAppSelector } from "helpers/redux";
import { imageItemThunk, imageUserIdThunk, imageUserThunk } from "redux/actions/image.actions";

const imageMimeType = /image\/(png|jpg|jpeg|.gif)/i;

type ImageProps = {
  typeImage?: string;
  id: string;
}

const ImageElement:React.FC<ImageProps> = ({typeImage, id}) => {

  const {userData} = useAppSelector(state=>state.user)

  const dispatch = useAppDispatch()

  const useImage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileDataURL, setFileDataURL] = useState<string | null>(null);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || !e.target.files[0]) {
        alert("Файлы не выбраны");
        return;
      }
      const file = e.target.files[0];
      if (!file.type.match(imageMimeType)) {
        alert("Тип файла не подходит для изображения предмета");
        return;
      }
      setFile(file);

      if(typeImage === "user"){
          if(userData?.avatarId === id){
              dispatch(imageUserThunk({ file }));
          }else{
              dispatch(imageUserIdThunk({id, file}))
          }
      }else{
          dispatch(imageItemThunk({id, file}))
      }

    };
  
    useEffect(() => {
      let fileReader: FileReader;
      let isCancel = false;
      if (file) {
        fileReader = new FileReader();
        fileReader.onload = e => {
          const { result } = e.target!;
          if (result && !isCancel) {
            setFileDataURL(result as string);
          }
        };
        fileReader.readAsDataURL(file);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      };
    }, [file]);
  
    return { fileDataURL, changeHandler };
  };
  
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