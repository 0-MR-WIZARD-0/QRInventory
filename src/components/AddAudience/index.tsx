import styles from "./add.audience.module.scss";

const AddAudience = () => {
  return (
    <div className={styles.addAudience}>
      <input placeholder='Enter the audience number'></input>
      <select name='' id=''>
        <option>Колледж бизнес-технологий</option>
        <option>Колледж современных-технологий</option>
      </select>
      <button className={styles.addAudienceCreateQrButton}>Create QR-code</button>
    </div>
  );
};

export default AddAudience;
