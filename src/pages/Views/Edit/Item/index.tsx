import { LoadingTransitionComponent } from "components/Basic/Loader";
import { useAppSelector } from "helpers/redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchItemThunk } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import { Item } from "types/Item";
import { MainViewRoutes } from "types/Routes";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import styles from "./view.edit.item.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { nameValidation, articleValidation } from "validation";
import Input from "components/Basic/Input";
import ImageElement from "components/Complex/ImageElement";
import editStyles from "components/Complex/Wrappers/EditPageWrapper/edit.page.wrapper.module.scss";
import { useImage } from "helpers/hooks";
import api from "helpers/axios";
import { Scenario } from "components/Basic/Scenario";
import { PasswordConfirmation } from "components/Basic/Scenario/default";
import { SuccesConfirmationEditItem } from "./Scenario";

export type EditItemData = {
  name: string;
  article: string;
};

const ItemComponent: React.FC<Item> = ({ name, article, id, imageId }) => {
  const methods = useForm<EditItemData>({ mode: "onBlur", defaultValues: { name, article } });
  const imageMethods = useImage();

  useEffect(() => {
    (async () => {
      try {
        if (imageId) {
          let imageBlob = (await api.get(`/image/${imageId}`, { responseType: "blob" })).data;
          const imageURL = URL.createObjectURL(imageBlob);
          if (imageBlob) imageMethods.uploadImage(imageURL);
        }
      } catch (error) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EditItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const onSubmit = methods.handleSubmit(async data => {
    return EditItemModalRef.current?.createModal();
  });

  return (
    <>
      <Scenario
        ref={EditItemModalRef}
        modalName='edit-item-confirmation'
        script={{
          0: { content: PasswordConfirmation, onSuccess: 1, onFailure: -1 },
          1: {
            content: SuccesConfirmationEditItem,
            props: { imageMethods, id, data: methods.getValues() as EditItemData },
            onFailure: -1,
            onSuccess: -1
          }
        }}
      />
      <EditPageWrapper
        onSubmit={onSubmit}
        component={
          <FormProvider {...methods}>
            <div className={styles.wrapper}>
              <h3>Редактирование предмета {article}</h3>
              <div className={styles.wrapperEdit}>
                <ImageElement {...imageMethods} />
                <div className={editStyles.editInputsWrapper}>
                  <Input {...nameValidation} />
                  <Input {...articleValidation} />
                </div>
              </div>
            </div>
          </FormProvider>
        }
      />
    </>
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
        return navigate(`/${MainViewRoutes.items}`);
      }

      try {
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageitemData(existing);
        else {
          let res = await dispatch(fetchItemThunk({ id }));

          if (res.meta.requestStatus === "rejected") {
            return navigate(`/${MainViewRoutes.items}`);
          }

          return setPageitemData(res.payload as Item);
        }
      } catch (error) {
        return setPageitemData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageItemData === undefined) return <LoadingTransitionComponent />;
  if (pageItemData === null) return <b>Произошла ошибка при загрузке предмета или он не найден.</b>;
  return <ItemComponent {...pageItemData} />;
};

export default EditItem;
