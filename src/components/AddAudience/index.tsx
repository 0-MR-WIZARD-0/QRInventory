import styles from "./add.audience.module.scss";

const option = [
  'Колледж бизнес-технологий', 'Колледж современных-технологий'
]

const AddAudience = () => {
  return (
    <div className={styles.addAudience}>
      {/* <input placeholder='Enter the audience number'></input>
      <select name='' id=''>
        {option.map(element => (
          <option>{element}</option>
        ))}
      </select>
      <button>Create QR-code</button> */}
      <button>Добавить новый кабинет +</button>
    </div>
  );
};

export default AddAudience;
