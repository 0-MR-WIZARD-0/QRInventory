import { useAction } from "helpers/redux";
import styles from "./view.main.items.module.scss";
import api from "helpers/axios";
import { useEffect, useRef } from "react";
import { Scenario } from "components/Basic/Scenario";
import { CreateItemScript } from "./Scenario";
import AddNewButton from "components/Basic/Buttons/AddNew";

const ViewItems: React.FC = () => {
  const { updateItem } = useAction();

  useEffect(() => {
    (async () => {
      await api.get("/item/all").then(res => {
        // console.log(res.data);
        updateItem(res.data);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  // const { itemData } = useAppSelector(state => state.item);

  return (
    <>
      <Scenario ref={createItemModalRef} modalName='create-item' script={CreateItemScript} />
      <div className={styles.wrapperViewItems}>
        {/* Нужно ли админу создавать предметы.. Не лучше ли перенести создание сразу в кабинет, а тут оставить вывод данных всех предметов с фильтрацией по организациям
        так же преподаватель не может создавать предметы, нужно исправить*/}
        <AddNewButton onClick={() => createItemModalRef.current?.createModal()} title='Добавить новый предмет +' />


        {/* {itemData?.map(elem=>(

        <div key={elem.id}>
            <div className={styles.img}>
              <img src="https://cdn.vamdodoma.ru/images/hoff/3f/cb/69547133e2314ce6045b85c57b35637c41fb.jpg?w=616" alt={elem.id}></img>
            </div>
            <h3>{elem.name}</h3>
            <p>Артикул: {elem.article}</p>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default ViewItems;
