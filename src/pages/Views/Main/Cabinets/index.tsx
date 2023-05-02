import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./view.main.cabinets.module.scss";
import { cabinetViewPath } from "types/App";
import { useAppSelector, useAction } from "helpers/redux";
import api from "helpers/axios";

const ViewCabinets = () => {

  let navigate = useNavigate();

  const { updateCabinet } = useAction();
  
  useEffect(() => {
    (async () => {
      await api
      .get("/cabinet/all")
      .then( res => {
        updateCabinet(res.data)
      })
      .catch( err => {
        console.log(err);
      })
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  const { cabinetData } = useAppSelector(state => state.cabinet);

  return (
    <div className={styles.wrapperViewCabinets}>
      <button>Добавить новый кабинет +</button>

      {cabinetData?.map(cabinet => (
        <div
          onClick={() => {
            navigate(`${cabinetViewPath}/${cabinet.cabinetNumber}`);
          }}
          key={cabinet.id}>
          <div className={styles.img}>
            <img src="" alt={cabinet.id}></img>
          </div>
          <h3>Кабинет {cabinet.cabinetNumber}</h3>
          <div className={styles.info}>
            <p>Учителей: {cabinet.teachers?.length}</p>
            <p>Предметов: {cabinet.items?.length}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewCabinets;
