import { NavigateFunction, useNavigate } from "react-router-dom";
import { cabinetViewPath } from "types/App";
import { useAppSelector, useAction } from "helpers/redux";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { CreateCabinetScript } from "./Scenario";
import { Scenario } from "components/Basic/Scenario";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useEffect, useState, memo } from "react";
import { Cabinet } from "types/Cabinet";
import { useInView } from "react-intersection-observer";
import { useListenOnline, useObserver } from "helpers/hooks";
import ViewsWrapper from "components/Complex/Wrappers/ViewsWrapper";
import styles from "components/Complex/Wrappers/ViewsWrapper/view.wrapper.module.scss";
import ProtectedComponent from "components/Protected/Component";
import { Roles } from "types/User";

const paginationSettings = {
  perPage: 7
};

type ViewCabinetProps = {
  navigate: NavigateFunction;
  cabinet: Cabinet;
  lastElementRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

const ViewCabinet: React.FC<ViewCabinetProps> = memo(
  ({ cabinet, navigate, lastElementRef }) => {
    const { ref, inView } = useInView({ threshold: 0 });

    return (
      <button
        ref={el => {
          ref(el);
          if (lastElementRef) {
            lastElementRef.current = el;
          }
        }}
        onClick={() => {
          navigate(`${cabinetViewPath}/${cabinet.id}`);
        }}
        key={cabinet.id}>
        <div className={styles.img}>{inView && <QRCodeSVG value={`${cabinetViewPath}/${cabinet.cabinetNumber}`} />}</div>
        <h3>Кабинет {cabinet.cabinetNumber}</h3>
        <div className={styles.info}>
          <p>Учителей: {cabinet.teachers?.length}</p>
          <p>Предметов: {cabinet.items?.length}</p>
        </div>
      </button>
    );
  },
  (prev, next) => prev.cabinet.id === next.cabinet.id && prev.lastElementRef === next.lastElementRef
);

const ViewCabinets: React.FC = () => {
  const navigate = useNavigate();
  const institution = useAppSelector(state => state.institution);
  const { data, loading, maxElements, error } = useAppSelector(state => state.viewCabinets);
  const { fetchCabinetsThunk } = useAction();
  const [page, setPage] = useState(1);
  const { isOnline } = useListenOnline();

  const fetchData = () => {
    if (!data || data.length < paginationSettings.perPage * page) {
      return fetchCabinetsThunk({ page, perPage: paginationSettings.perPage });
    }
  };
  useEffect(() => {
    // console.log(page);
    if (!error && institution.id) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, institution.id]);
  useEffect(() => {
    if (institution.id && error && isOnline && (!data || data.length < paginationSettings.perPage * page)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isOnline]);

  useEffect(() => {
    setPage(1);
  }, [institution.id]);

  const onLastInView = (entires: IntersectionObserverEntry[]) => {
    if (page * paginationSettings.perPage >= maxElements) return;
    if (!loading && data && data.length < maxElements) {
      if (entires[0].isIntersecting) setPage(p => p + 1);
    }
  };
  const [lastItemRef] = useObserver(onLastInView);

  const createCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  return (
    <>
      <Scenario ref={createCabinetModalRef} modalName='create-cabinet' script={CreateCabinetScript} />
      <ViewsWrapper
        addNewButton={<ProtectedComponent component={<AddNewButton onClick={() => createCabinetModalRef.current?.createModal()} title='Добавить новый кабинет +' />} roles={[Roles.admin, Roles.teacher]} />}
        children={data ? data.map((cabinet, i) => <ViewCabinet key={cabinet.id} cabinet={cabinet} navigate={navigate} lastElementRef={error ? undefined : i === data.length - 1 ? lastItemRef : undefined} />) : undefined}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default ViewCabinets;
