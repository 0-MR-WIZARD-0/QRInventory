import styles from "./addAudience.module.scss";

const option = ["Колледж бизнес-технологий", "Колледж современных-технологий"];

const AddAudience = () => {
  return (
      <div>
        <h2>Добавление аудитории</h2>
        <input placeholder="Номер аудитории"></input>
        <button>Создать</button>
      </div>
  );
};

export default AddAudience;
