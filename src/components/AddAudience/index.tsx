import styles from "./addAudience.module.scss";

const option = ["Колледж бизнес-технологий", "Колледж современных-технологий"];

const AddAudience = () => {
  return (
      <button className={styles.addAudience}>Добавить новый кабинет +</button>
  );
};

export default AddAudience;
