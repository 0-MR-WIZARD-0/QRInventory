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
import { useForm, FormProvider } from "react-hook-form";
import { nameValidation, articleValidation } from "validation";
import Input from "components/Basic/Input";
import ImageElement from "components/Complex/ImageElement";

const ItemComponent: React.FC<Item> = ({ article, id, imageId, institution }) => {

  const onSubmit = async () => {};

  const methods = useForm({ mode: "onBlur" });

  return (
    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <FormProvider {...methods}>
        <div className={stylesComponent.wrapper}>
          <h3 className={stylesComponent.title}>Редактирование предмета {article}</h3>
          <div className={stylesComponent.controlsWrapper}>
            <ImageElement/>
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
