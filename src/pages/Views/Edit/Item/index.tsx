import Icon from "components/Basic/Icon";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import { useAppSelector } from "helpers/redux";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import { fetchItemThunk } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import { Item } from "types/Item";
import { MainViewRoutes } from "types/Routes";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import styles from "components/Complex/Wrappers/EditPageWrapper/edit.page.wrapper.module.scss";
import stylesComponent from "./view.edit.item.module.scss";

const imageMimeType = /image\/(png|jpg|jpeg|.gif)/i;

const ItemComponent: React.FC<Item> = ({ article, id, imageId, institution }) => {

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

  const onSubmit = async () => {};

  return (

    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <FormProvider {...methods}>
        <div className={styles.wrapper}>
          <h3 className={stylesComponent.title}>Редактирование предмета {article}</h3>
          <div className={stylesComponent.controlsWrapper}>
            {fileDataURL ? (
              <>
                <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
                <img alt='изображение предмета' src={fileDataURL} draggable={false} />
              </>
            ) : (
              <div className={stylesComponent.imageWrapper}>
                <label>
                  <Icon icon='image' />
                  <input onChange={changeHandler} type='file' accept='.png, .jpg, .jpeg' />
                  <h5>Выбрать фотографию предмета</h5>
                  <span>макс 5мб</span>
                </label>
              </div>
            )}
            <div className={stylesComponent.buttonWrapper}>
              <Input {...nameValidation}/>
              <Input {...articleValidation}/>
            </div>
          </div>
        </div>
        </FormProvider>
      }
    />

  );
};
const EditItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useAppSelector(state => state.viewItems);
  const [pageItemData, setPageitemData] = useState<Item | null | undefined>();
  useEffect(() => {
    (async () => {
      if (!id) {
        console.log("Произошла ошибка при загрузке предмета");
        return navigate(`/${MainViewRoutes.items}`);
      }

      try {
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageitemData(existing);
        else {
          let res = await dispatch(fetchItemThunk({ id }));

          if (res.meta.requestStatus === "rejected") {
            console.log("Произошла ошибка при загрузке предмета");
            return navigate(`/${MainViewRoutes.items}`);
          }

          return setPageitemData(res.payload);
        }
      } catch (error) {
        return setPageitemData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageItemData === undefined) return <LoadingTransitionComponent />;
  if (pageItemData === null) return <b>произошла ошибка при загрузке предмета или он не найден</b>;
  return <ItemComponent {...pageItemData} />;
};

export default EditItem;
