import Icon from "components/Basic/Icon";
import Input from "components/Basic/Input";
import ViewElement from "components/Complex/ViewElement";
import styles from "./view.edit.cabinet.module.scss";

const CabinetComponent: React.FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Редактирование предмета</h3>
        <div className={styles.imageWrapper}>
          <Icon icon='image' />
          <h5>Выбрать фотографию предмета</h5>
          <span>макс 5мб</span>
        </div>
        <div className={styles.buttonWrapper}>
          <Input name='name' onChange={() => {}} value={""} label='название' placeholder='стул обыкновенный' />
          <Input name='article' onChange={() => {}} value={""} label='артикул' placeholder='Ш-504-301' />
        </div>
      </div>
      <div className={styles.bottomMenu}>
        <button className={styles.button}>отменить</button>
        <button className={styles.button}>сохранить</button>
      </div>
    </>
  );
};

const EditCabinet: React.FC = () => {
  return <ViewElement component={<CabinetComponent />} inlineStyles={{ flexDirection: "column" }} />;
};

export default EditCabinet;
