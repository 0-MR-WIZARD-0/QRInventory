import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cabinet } from "types/Cabinet";
import { QRCodeSVG } from "qrcode.react";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import { roledCabinetEditDataBarOptions, roledUserDataBarOptions, roledUserEditDataBarOptions } from "types/User";
import ProtectedComponent from "components/Protected/Component";
import { MenuBar } from "components/Complex/MenuBar";
import DropList from "components/Complex/DropList";
import { useAppSelector } from "helpers/redux";
import styles from "./view.sub.cabinet.module.scss";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";
import { fetchCabinetThunk } from "redux/actions/cabinets.actions";
import { Item } from "types/Item";
import { Teacher } from "types/Teacher";

const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items, teachers }) => {
  const location = useLocation();


  const formatItems = (items: Item[]) => {
    return items.map(i => ({ key: i.id, name: i.name, value: i.article }));
  };

  const formatTeachers = (teachers: Teacher[]) => {
    return teachers.map(i => ({ key: i.id, name: i.fullName, value: i.email }));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper} onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <QRCodeSVG value={location.pathname} />
          <button>тап сюда или на qr чтобы скопировать ссылку</button>
        </div>
        <h1 className={styles.title} key={id}>
          Кабинет {cabinetNumber}
        </h1>
      </div>
      <div>
        <DropList 
          options={formatItems(items as Item[])}
        />
        <DropList 
          options={formatTeachers(teachers as Teacher[])}
        />
        <ProtectedComponent
          component={
            <div className={styles.menuBar}>
              <p>Панель управления кабинетом</p>
              <MenuBar barOptions={roledUserEditDataBarOptions["admin"]} />
            </div>
          }
        />
      </div>
    </>
  );
};

const ViewCabinet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data } = useAppSelector(state => state.viewCabinets);
  const [pageCabinetData, setPageCabinetData] = useState<Cabinet | null | undefined>();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return navigate(`/${MainViewRoutes.cabinets}`);
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

export default ViewCabinet;
