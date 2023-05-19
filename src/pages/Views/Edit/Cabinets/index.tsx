import Input from "components/Basic/Input";
import styles from "./view.edit.cabinet.module.scss";

const CabinetComponent: React.FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Редактирование кабинета</h3>
        <Input name='name' onChange={() => {}} value={""} label='название' placeholder='стул обыкновенный' />
        <ul>Колледж бизнес технологий</ul>
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
