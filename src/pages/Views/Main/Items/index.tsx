import { useAction, useAppSelector } from "helpers/redux";
import styles from "./view.main.items.module.scss";
import api from "helpers/axios";
import { useEffect, useRef, useState } from "react";
import { Scenario } from "components/Basic/Scenario";
import { CreateItemScript } from "./Scenario";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { LoadingTransitionComponent } from "components/Basic/Loader";

const ViewItems: React.FC = () => {
  const { fetchItemsThunk } = useAction();

  const [page, setPage] = useState(1);
  const nextPage = () => setPage(p => p + 1);
  useEffect(() => {
    fetchItemsThunk({ page, perPage: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const createItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const { data, loading } = useAppSelector(state => state.viewItems);

  return (
    <>
      <Scenario ref={createItemModalRef} modalName='create-item' script={CreateItemScript} />
      <div className={styles.wrapperViewItems}>
        {/* Нужно ли админу создавать предметы.. Не лучше ли перенести создание сразу в кабинет, а тут оставить вывод данных всех предметов с фильтрацией по организациям
        так же преподаватель не может создавать предметы, нужно исправить*/}
        <AddNewButton onClick={() => createItemModalRef.current?.createModal()} title='Добавить новый предмет +' />

        {data?.map(elem => (
          <div key={elem.id}>
            <div className={styles.img}>
              <img src='https://cdn.vamdodoma.ru/images/hoff/3f/cb/69547133e2314ce6045b85c57b35637c41fb.jpg?w=616' alt={elem.id}></img>
            </div>
            <h3>{elem.name}</h3>
            <p>Артикул: {elem.article}</p>
          </div>
        ))}

        {/* в конце чтобы при подгрузке данных лоадер не весь экран занимал */}
      </div>
      {loading && <LoadingTransitionComponent />}
    </>
  );
};

export default ViewItems;
