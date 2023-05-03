import styles from "./view.main.institutions.module.scss";
import { useAppSelector } from "helpers/redux";
import { useEffect } from "react";
import { useAction } from "helpers/redux";
import api from "helpers/axios";

const ViewInsitutions: React.FC = () => {
  const { updateInstitution } = useAction();

  useEffect(() => {
    (async () => {
      await api
        .get("/institution/all", { params: { full: true } })
        .then(res => {
          updateInstitution(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { institutionData } = useAppSelector(state => state.institution);

  return (
    <div className={styles.wrapperViewInstitutions}>
      <button>Добавить новое учреждение +</button>
      {/* {institutionData?.map((elem)=>(
        <div key={elem.id}>
          <h3>{elem.name}</h3>
          <p>Кабинетов: {elem.cabinets?.length}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ViewInsitutions;
