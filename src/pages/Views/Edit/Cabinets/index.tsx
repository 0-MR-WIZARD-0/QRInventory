import Input from "components/Basic/Input";
import styles from "./view.edit.cabinet.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cabinet } from "types/Cabinet";
import { useAppDispatch } from "redux/store";
import { useAppSelector } from "helpers/redux";
import { MainViewRoutes } from "types/Routes";
import { fetchCabinetThunk } from "redux/actions/cabinets.actions";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import ProtectedComponent from "components/Protected/Component";
import { Roles } from "types/User";

const CabinetComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAppSelector(state => state.viewCabinets);
  const [pageCabinetData, setPageCabinetData] = useState<Cabinet | null | undefined>();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return navigate(`/${MainViewRoutes.cabinets}`);
        console.log(data);
        let existing = data?.find(e => e.id === id);
        if (existing) return setPageCabinetData(existing);
        else {
          let res = await dispatch(fetchCabinetThunk({ id }));

          if (res.meta.requestStatus === "rejected") {
            console.log("Произошла ошибка при загрузке кабинета");
            return navigate(`/${MainViewRoutes.cabinets}`);
          }

          return setPageCabinetData(res.payload);
        }
      } catch (error) {
        return setPageCabinetData(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    // edit data bla bla
    // либо результат запроса добавлять в список кабинетов либо заново получать
    return navigate(`/${MainViewRoutes.cabinets}`);
  };

  if (pageCabinetData === undefined) return <LoadingTransitionComponent />;
  if (pageCabinetData === null) return <b>произошла ошибка при загрузке кабинета или он не найден</b>;

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Редактирование кабинета {pageCabinetData?.cabinetNumber}</h3>
        <ul>Колледж бизнес технологий</ul>
        {/* Дроплист учителей только у админа в нем возможность добавить в кабинет или удалить, method patch */}
        <ProtectedComponent component={<ul>Учителя (4)</ul>} roles={[Roles.admin]} />
        <ul>Предметы (10)</ul>
      </div>
      <div className={styles.bottomMenu}>
        <button className={styles.button} onClick={() => navigate(-1)}>
          отменить
        </button>
        <button className={styles.button} onClick={onSubmit}>
          сохранить
        </button>
      </div>
    </>
  );
};

const EditCabinet: React.FC = () => {
  return <CabinetComponent />;
};

export default EditCabinet;
