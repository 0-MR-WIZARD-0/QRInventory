import { LoadingTransitionComponent } from "components/Basic/Loader";
import { useAction, useAppSelector } from "helpers/redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { editItemThunk, fetchItemThunk, RejectResponsesItem } from "redux/actions/items.actions";
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
import { imageItemThunk } from "redux/actions/image.actions";
import { RejectResponsesInstitution } from "redux/actions/institutions.actions";

const ItemComponent: React.FC<Item> = ({ name, article, id, imageId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const institution = useAppSelector(state => state.institution);
  const { addError, searchItemThunk } = useAction();

  const methods = useForm<{ name: string; article: string }>({ mode: "onBlur", defaultValues: { name, article } });
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
  }, []);

  const onSubmit = methods.handleSubmit(async data => {
    if (imageMethods.file !== undefined) {
      let res = await dispatch(imageItemThunk({ id, file: imageMethods.file }));
      if (res.meta.requestStatus === "rejected") {
        return addError({
          type: "user",
          description: RejectResponsesItem.editItemError + ". Произошла ошибка при загрузке фото."
        });
      }
    }

    if (data.article.length && data.name.length !== 0) {
      const res = await dispatch(editItemThunk({ id, ...data }));
      if (res.meta.requestStatus === "fulfilled") {
        if (!institution.id) {
          return addError({
            type: "institution",
            description: RejectResponsesInstitution.notFound
          });
        }
        await searchItemThunk({ institution: institution.id, take: 1, skip: 0, id });
        return navigate(location.slice(0, location.length - 1).join("/"));
      }
    } else return addError({ type: "item", description: RejectResponsesItem.editItemError });
  });

  return (
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

          return setPageitemData(res.payload);
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
