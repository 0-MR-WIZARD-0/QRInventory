import Icon from "components/Basic/Icon";
import Image from "components/Basic/Image";
import Input from "components/Basic/Input";
import { useEffect, useState } from "react";
import styles from "./view.edit.item.module.scss";

const imageMimeType = /image\/(png|jpg|jpeg|.gif)/i;

type DropImageProps = {
  onImageSelect: (x: any) => any;
  image: any | undefined;
};

const ItemComponent: React.FC = () => {
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

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Редактирование предмета</h3>
        <div className={styles.controlsWrapper}>
          {fileDataURL ? (
            <>
              <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
              <img alt='изображение предмета' src={fileDataURL} draggable={false} />
            </>
          ) : (
            <div className={styles.imageWrapper}>
              <label>
                <Icon icon='image' />
                <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
                <h5>Выбрать фотографию предмета</h5>
                <span>макс 5мб</span>
              </label>
            </div>
          )}
          <div className={styles.buttonWrapper}>
            {/* <Input name='name' onChange={() => {}} value={""} label='название' placeholder='стул обыкновенный' />
            <Input name='article' onChange={() => {}} value={""} label='артикул' placeholder='Ш-504-301' /> */}
          </div>
        </div>
      </div>
      <div className={styles.bottomMenu}>
        <button className={styles.button}>отменить</button>
        <button className={styles.button}>сохранить</button>
      </div>
    </>
  );
};
const EditItem: React.FC = () => {
  return <ItemComponent />;
};

export default EditItem;
