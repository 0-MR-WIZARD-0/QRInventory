import styles from "./view.main.items.module.scss";

const ViewItems: React.FC = () => {
  return (
    <div className={styles.wrapperViewItems}>
      <button>Добавить новый предмет +</button>
      <div
          // onClick={() => {
          //   navigate(`${cabinetViewPath}/${cabinet.cabinetNumber}`);
          // }}
          >
          <div className={styles.img}>
            <img src="https://cdn.vamdodoma.ru/images/hoff/3f/cb/69547133e2314ce6045b85c57b35637c41fb.jpg?w=616" alt=""></img>
          </div>
          <h3>Стул обыкновенный</h3>
          {/* <div className={styles.info}> */}
            <p>Артикул: Ш-504</p>
            {/* <p>Предметов: 20</p> */}
          {/* </div> */}
        </div>
    </div>
  );
};

export default ViewItems;
