import styles from "./view.main.institutions.module.scss";

const ViewInsitutions: React.FC = ()=> {

  return (
    <div className={styles.wrapperViewInstitutions}>
      <button>Добавить новое учреждение +</button>
      <div>
        <h3>Колледж бизнес-технологий</h3>
        <p>Кабинетов: 20</p>
      </div>
    </div>
  );
};



export default ViewInsitutions;
