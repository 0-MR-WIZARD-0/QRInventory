import Input from "components/Basic/Input";
import styles from "./view.edit.user.module.scss"
import Icon from "components/Basic/Icon";
import { useState, useEffect } from "react";

const imageMimeType = /image\/(png|jpg|jpeg|.gif)/i;

const UserComponent: React.FC = () => {

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

        <h3 className={styles.title}>Редактирование аккаунта</h3>
        <div>
        {fileDataURL ? (
            <>
              <img alt='изображение предмета' src={fileDataURL} draggable={false} />
              <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
            </>
          ) : (
          <div className={styles.imageWrapper}>
                <Icon icon='image' />
                <label>
                  <input
                    onChange={changeHandler}
                    type='file' accept='.png, .jpg, .jpeg' />
                  <h5>Выбрать фотографию аккаунта</h5>
                  <span>макс 5мб</span>
                </label>
          </div>
          )}
          <div>
            {/* <Input name='fullname' onChange={() => {}} value={""} label='фио' />
            <Input name='email' onChange={() => {}} value={""} label='почта' />
            <Input name='oldPassword' onChange={() => {}} value={""} label='старый пароль' type="password"/>
            <Input name='newPassword' onChange={() => {}} value={""} label='новый пароль' type="password"/> */}
          </div>
        </div>
      </div>
      <div className={styles.bottomMenu}>
        <button className={styles.button}>отменить</button>
        <button className={styles.button}>сохранить</button>
      </div>
    </>
  )
};

const EditUser: React.FC = () => {
  return <UserComponent />;
};

export default EditUser;
