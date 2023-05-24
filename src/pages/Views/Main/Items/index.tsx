import { useAction, useAppSelector } from "helpers/redux";
import styles from "./view.main.items.module.scss";
import { useEffect, useRef, useState } from "react";
import { Scenario } from "components/Basic/Scenario";
import { CreateItemScript } from "./Scenario";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import { useObserver } from "helpers/hooks";
import { Item } from "types/Item";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { itemViewPath } from "types/App";
import { useInView } from "react-intersection-observer";

const paginationSettings = {
  perPage: 5
};

type ViewItemProps = {
  navigate: NavigateFunction;
  item: Item;
  lastElementRef?: React.MutableRefObject<HTMLDivElement | null>;
};
const ViewItem: React.FC<ViewItemProps> = ({ navigate, item, lastElementRef }) => {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <div
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
      <div className={styles.img}>{item.imageId && inView ? <img src={`/image/${item.imageId}`} alt={item.article} draggable={false} /> : <></>}</div>
      <h3>{item.name}</h3>
      <p>Артикул: {item.article}</p>
    </div>
  );
};

const ViewItems: React.FC = () => {
  const navigate = useNavigate();
  const { fetchItemsThunk } = useAction();
  const institution = useAppSelector(state => state.institution);

  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!data || data.length < paginationSettings.perPage * page) {
      fetchItemsThunk({ page, perPage: paginationSettings.perPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, institution.id]);

  const createItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const { data, loading, maxElements } = useAppSelector(state => state.viewItems);
  const onLastInView = (entires: IntersectionObserverEntry[]) => {
    if (!loading && data && data.length < maxElements) {
      if (entires[0].isIntersecting) setPage(p => p + 1);
    }
  };
  const [lastItemRef] = useObserver(onLastInView);

  return (
    <>
      <Scenario ref={createItemModalRef} modalName='create-item' script={CreateItemScript} />
      
      <div className={styles.wrapperViewItems}>
        <AddNewButton onClick={() => createItemModalRef.current?.createModal()} title='Добавить новый предмет +' />
        {data?.map((item, i) => (
          <ViewItem key={item.id} item={item} navigate={navigate} lastElementRef={i === data.length - 1 ? lastItemRef : undefined} />
        ))}
      </div>
      {loading && <LoadingTransitionComponent />}
    </>
  );
};

export default ViewItems;
