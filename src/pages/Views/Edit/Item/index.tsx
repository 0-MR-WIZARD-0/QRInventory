import { LoadingTransitionComponent } from "components/Basic/Loader";
import { useAppSelector } from "helpers/redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { RejectResponsesItem, editItemThunk, fetchItemThunk } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import { Item } from "types/Item";
import { MainViewRoutes } from "types/Routes";
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import styles from "./view.edit.item.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { nameValidation, articleValidation } from "validation";
import Input from "components/Basic/Input";
import ImageElement from "components/Complex/ImageElement";
import { setError } from "redux/reducers/error.reducer";

const ItemComponent: React.FC<Item> = ({ name, article, id }) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");

  const methods = useForm<{name: string, article: string}>({ mode: "onBlur" });

  const [info, setInfo] = useState({
    name: name || "",
    article: article || ""
  })

  const onSubmit = methods.handleSubmit(async data => {
    if (data.article.length && data.name.length !== 0){
      const res = await dispatch(editItemThunk({ id, name: data.name, article: data.article}));
      if (res.meta.requestStatus === "fulfilled") return navigate(location.slice(0, location.length - 1).join("/"));
      else return dispatch(setError(RejectResponsesItem.editItemError))
    }else return dispatch(setError("Присутствуют незаполненные поля"))
  });

  return (
    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <FormProvider {...methods}>
        <div className={styles.wrapper}>
          <h3>Редактирование предмета {article}</h3>
          <div className={styles.wrapperEdit}>
            <ImageElement/>
            <div>
              <Input {...nameValidation} value={info.name} onChange={(e:any)=>setInfo({ ...info, name: e.target.value })}/>
              <Input {...articleValidation} value={info.article} onChange={(e:any)=>setInfo({ ...info, article: e.target.value })}/>
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
        dispatch(setError(RejectResponsesItem.fetchItemError))
        return navigate(`/${MainViewRoutes.items}`);
      }

      try {
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageitemData(existing);
        else {
          let res = await dispatch(fetchItemThunk({ id }));

          if (res.meta.requestStatus === "rejected") {
            dispatch(setError(RejectResponsesItem.fetchItemError))
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
