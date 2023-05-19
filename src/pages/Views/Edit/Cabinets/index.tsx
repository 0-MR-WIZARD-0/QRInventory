import Input from "components/Basic/Input";
import styles from "./view.edit.cabinet.module.scss";
import { useParams } from "react-router-dom";

const CabinetComponent: React.FC = () => {

  const {id} = useParams()

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Редактирование кабинета {id}</h3>
        <ul>Колледж бизнес технологий</ul>
        {/* Дроплист учителей только у админа в нем возможность добавить в кабинет или удалить, method patch */}
        <ul>Учителя (4)</ul>
        
        <ul>Предметы (10)</ul>
      </div>
      <div className={styles.bottomMenu}>
        <button className={styles.button}>отменить</button>
        <button className={styles.button}>сохранить</button>
      </div>
    </>
  );
};

const EditCabinet: React.FC = () => {
  return <CabinetComponent />;
};

export default EditCabinet;
