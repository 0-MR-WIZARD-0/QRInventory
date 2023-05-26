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
import EditPageWrapper from "components/Complex/Wrappers/EditPageWrapper";
import DropList from "components/Complex/DropList";
import { Teacher } from "types/Teacher";
import { Item } from "types/Item";

const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items, teachers }) => {
  const navigate = useNavigate();

  const formatItems = (items: Item[]) => {
    return items.map(i => ({ key: i.id, name: i.name, value: i.article }));
  };

  const formatTeachers = (teachers: Teacher[]) => {
    return teachers.map(i => ({ key: i.id, name: i.fullName, value: i.email }));
  };

  const onSubmit = async () => {
    // edit data bla bla
    // либо результат запроса добавлять в список кабинетов либо заново получать
    return navigate(`/${MainViewRoutes.cabinets}`);
  };

  return (
    <EditPageWrapper
      onSubmit={onSubmit}
      component={
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Редактирование кабинета {cabinetNumber}</h3>
          <p>Колледж бизнес технологий</p>

          <ProtectedComponent 
            component={
              <DropList
                options={formatTeachers(teachers as Teacher[])}
                enableSearch={true}
                enableEdit={true}
              />
            } 
            roles={[Roles.admin]} 
          />

          <ProtectedComponent 
            component={
              <DropList
                options={formatTeachers(teachers as Teacher[])}
                enableSearch={true}
              />
            } 
            roles={[Roles.teacher]} 
          />

          <DropList options={formatItems(items as Item[])} enableSearch={true} enableEdit={true}/>
          
        </div>
      }
    />
  );
};

const EditCabinet: React.FC = () => {
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

  if (pageCabinetData === undefined) return <LoadingTransitionComponent />;
  if (pageCabinetData === null) return <b>произошла ошибка при загрузке кабинета или он не найден</b>;
  return <CabinetComponent {...pageCabinetData} />;
};

export default EditCabinet;
