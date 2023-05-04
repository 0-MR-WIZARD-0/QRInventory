import { useAction, useAppSelector } from "helpers/redux";
import styles from "./view.main.items.module.scss";
import api from "helpers/axios";
import { useEffect } from "react";

const ViewItems: React.FC = () => {
  const { updateItem } = useAction();

  useEffect(() => {
    (async () => {
      await api
        .get("/item/all")
        .then(res => {
          updateItem(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { itemData } = useAppSelector(state => state.item);

  return (
    <div className={styles.wrapperViewItems}>
      <button>Добавить новый предмет +</button>
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
  );
};

export default ViewItems;
