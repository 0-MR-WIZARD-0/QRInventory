import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Cabinet } from "types/Cabinet";
import { QRCodeSVG } from "qrcode.react";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import { roledCabinetEditDataBarOptions } from "types/User";
import ProtectedComponent from "components/Protected/Component";
import { MenuBar } from "components/Complex/MenuBar";
import DropList from "components/Complex/DropList";
import { useAppSelector } from "helpers/redux";
import styles from "./view.sub.cabinet.module.scss";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";
import { fetchCabinetThunk } from "redux/actions/cabinets.actions";
import { formatItemsJSX, formatTeachersJSX, PreviewItem, PreviewUser } from "components/Complex/DropList/Categorized/categorized";
import { Scenario } from "components/Basic/Scenario";
import { DeleteCabinetConfirmation, SuccessConfirmationDeleteCabinet } from "./Scenario";

const CabinetComponent: React.FC<Cabinet> = ({ cabinetNumber, id, items, teachers }) => {
  const location = useLocation();
  const { userData } = useAppSelector(state => state.user);

  const DeleteCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const buttons = useRef(
    roledCabinetEditDataBarOptions(
      DeleteCabinetModalRef,
      userData?.role,
      teachers.some(t => t.id === userData?.id)
    )
  );

  return (
    <>
      <Scenario
        ref={DeleteCabinetModalRef}
        modalName='delete-cabinet-confirmation'
        script={{
          0: { content: DeleteCabinetConfirmation, onSuccess: 1, onFailure: -1 },
          1: {
            content: SuccessConfirmationDeleteCabinet,
            props: { id },
            onFailure: -1,
            onSuccess: -1
          }
        }}
      />
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper} onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <QRCodeSVG value={location.pathname} />
          <button>тап сюда или на qr чтобы скопировать ссылку</button>
        </div>
        <h1 className={styles.title} key={id}>
          Кабинет {cabinetNumber}
        </h1>
      </div>
      <div className={styles.rightSideContent}>
        <DropList
          name={
            <span>
              Учителя <b>({teachers.length})</b>
            </span>
          }
          inputName='user'
          options={formatTeachersJSX((teachers as PreviewUser[]) ?? [], false, () => {})}
        />
        <DropList
          name={
            <span>
              Предметы <b>({items.length})</b>
            </span>
          }
          inputName='item'
          options={formatItemsJSX((items as PreviewItem[]) ?? [], false, () => {})}
        />
        {buttons.current.length > 0 && (
          <ProtectedComponent
            component={
              <div className={styles.menuBar}>
                <p>Панель управления кабинетом</p>
                {userData ? <MenuBar barOptions={buttons.current} /> : <></>}
              </div>
            }
          />
        )}
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
  if (pageCabinetData === null) return <b>Произошла ошибка при загрузке кабинета или он не найден.</b>;

  return <CabinetComponent {...pageCabinetData} />;
};

export default ViewCabinet;
