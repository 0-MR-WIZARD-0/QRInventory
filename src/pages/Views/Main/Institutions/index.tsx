import { useAction, useAppSelector } from "helpers/redux";
import { memo, useEffect, useRef, useState } from "react";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { Scenario } from "components/Basic/Scenario";
import { CreateInstitutionScript } from "./Scenario";
import { Institution } from "types/Institution";
import ViewsWrapper from "components/Complex/Wrappers/ViewsWrapper";
import ProtectedComponent from "components/Protected/Component";
import { Roles } from "types/User";
import { useListenOnline, useObserver } from "helpers/hooks";
import styles from "components/Complex/Wrappers/ViewsWrapper/view.wrapper.module.scss";
import stylesComponent from "./view.main.institutions.module.scss";

type ViewInstitutionProps = {
  institution: Institution;
  lastElementRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

const paginationSettings = {
  perPage: 7
};

const ViewInstitution: React.FC<ViewInstitutionProps> = memo(
  ({ institution, lastElementRef }) => {
    const { setInstitution } = useAction();

    console.log(institution.teachers);

    return (
      <button ref={lastElementRef} key={institution.id} onClick={() => setInstitution({ id: institution.id, name: institution.name })}>
        <h3>{institution.name}</h3>
        <div className={styles.info}>
          <p>Кабинетов: {institution.cabinets ?? 0}</p>
          <p>Предметов: {institution.items ?? 0}</p>
          <p>Учителей: {institution.teachers ?? 0}</p>
        </div>
      </button>
    );
  },
  (prev, next) => prev.institution.id === next.institution.id && prev.lastElementRef === next.lastElementRef
);

const ViewInsitutions: React.FC = () => {
  const createInstitutionModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const { fetchInstitutionsThunk } = useAction();

  const { data, error, loading, maxElements } = useAppSelector(state => state.viewInstitutions);
  const [page, setPage] = useState(1);
  const { isOnline } = useListenOnline();

  const fetchData = () => {
    if (!data || data.length < paginationSettings.perPage * page) {
      return fetchInstitutionsThunk({ page, perPage: paginationSettings.perPage });
    }
  };
  useEffect(() => {
    if (!error) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    if (error && isOnline && (!data || data.length < paginationSettings.perPage * page)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isOnline]);

  const onLastInView = (entires: IntersectionObserverEntry[]) => {
    if (page * paginationSettings.perPage >= maxElements) return;
    if (!loading && data && data.length < maxElements) {
      if (entires[0].isIntersecting) setPage(p => p + 1);
    }
  };
  const [lastItemRef] = useObserver(onLastInView);

  return (
    <div className={stylesComponent.wrapper}>
      <Scenario ref={createInstitutionModalRef} modalName='create-institution' script={CreateInstitutionScript} />
      <ViewsWrapper
        addNewButton={<ProtectedComponent component={<AddNewButton onClick={() => createInstitutionModalRef.current?.createModal()} title='Добавить новое учреждение +' />} roles={[Roles.admin, Roles.teacher]} />}
        children={data ? data.map((institution, i) => <ViewInstitution key={institution.id} institution={institution} lastElementRef={error ? undefined : i === data.length - 1 ? lastItemRef : undefined} />) : undefined}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ViewInsitutions;
