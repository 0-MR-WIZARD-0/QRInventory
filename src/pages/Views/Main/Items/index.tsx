import { useAction, useAppSelector } from "helpers/redux";
import { useEffect, useRef, useState } from "react";
import { Scenario } from "components/Basic/Scenario";
import { CreateItemScript } from "./Scenario";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { useListenOnline, useObserver } from "helpers/hooks";
import { Item } from "types/Item";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { itemViewPath } from "types/App";
import { useInView } from "react-intersection-observer";
import ViewsWrapper from "components/Complex/Wrappers/ViewsWrapper";
import styles from "components/Complex/Wrappers/ViewsWrapper/view.wrapper.module.scss";
import Icon from "components/Basic/Icon";
import ProtectedComponent from "components/Protected/Component";
import { Roles } from "types/User";

const paginationSettings = {
  perPage: 5
};

type ViewItemProps = {
  navigate: NavigateFunction;
  item: Item;
  lastElementRef?: React.MutableRefObject<HTMLButtonElement | null>;
};
const ViewItem: React.FC<ViewItemProps> = ({ navigate, item, lastElementRef }) => {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <button
      ref={el => {
        ref(el);
        if (lastElementRef) {
          lastElementRef.current = el;
        }
      }}
      key={item.id}
      onClick={() => {
        navigate(`${itemViewPath}/${item.id}`);
      }}>
      <div className={styles.img}>{item.imageId && inView ? <img src={`/image/${item.imageId}`} alt={item.article} draggable={false} /> : inView ? <Icon icon='image' /> : <></>}</div>
      <h3>{item.name}</h3>
      <div className={styles.info}>
        <p>Артикул: {item.article}</p>
      </div>
    </button>
  );
};

const ViewItems: React.FC = () => {
  const navigate = useNavigate();
  const { fetchItemsThunk } = useAction();
  const institution = useAppSelector(state => state.institution);
  const { data, loading, maxElements, error } = useAppSelector(state => state.viewItems);
  const { isOnline } = useListenOnline();
  const [page, setPage] = useState(1);

  const fetchData = () => {
    if (!data || data.length < paginationSettings.perPage * page) {
      return fetchItemsThunk({ page, perPage: paginationSettings.perPage });
    }
  };
  useEffect(() => {
    if (!error) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, institution.id]);
  useEffect(() => {
    if (error && isOnline && (!data || data.length < paginationSettings.perPage * page)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isOnline]);

  useEffect(() => {
    setPage(1);
  }, [institution.id]);

  const createItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const onLastInView = (entires: IntersectionObserverEntry[]) => {
    if (!loading && data && data.length < maxElements) {
      if (entires[0].isIntersecting) setPage(p => p + 1);
    }
  };
  const [lastItemRef] = useObserver(onLastInView);

  return (
    <>
      <Scenario ref={createItemModalRef} modalName='create-item' script={CreateItemScript} />
      <ViewsWrapper
        addNewButton={<ProtectedComponent component={<AddNewButton onClick={() => createItemModalRef.current?.createModal()} title='Добавить новый предмет +' />} roles={[Roles.admin, Roles.teacher]} />}
        children={data ? data.map((item, i) => <ViewItem key={item.id} item={item} navigate={navigate} lastElementRef={error ? undefined : i === data.length - 1 ? lastItemRef : undefined} />) : undefined}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default ViewItems;
