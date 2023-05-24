import styles from "./view.main.institutions.module.scss";
import { useAppSelector } from "helpers/redux";
import { useEffect, useRef } from "react";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { Scenario } from "components/Basic/Scenario";
import { CreateInstitutionScript } from "./Scenario";

const ViewInsitutions: React.FC = () => {
  // const { setInstitution } = useAction();

  const createInstitutionModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const { userData } = useAppSelector(state => state.user);

  useEffect(() => {
    (async () => {
      try {
        // let res = await api.get("/institution/all", { params: { full: true } });
        // if (res.status === 200) {
        //   setInstitution(res.data);
        // } else {
        //   console.log(res.data);
        // }
        // зачем если эти данные приходят с получением пользователя
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Scenario ref={createInstitutionModalRef} modalName='create-institution' script={CreateInstitutionScript} />
      
      <div className={styles.wrapperViewInstitutions}>
        <AddNewButton onClick={() => createInstitutionModalRef.current?.createModal()} title='Добавить новое учреждение +' />
        {userData?.institutions?.map(elem => (
          <div key={elem.id}>
            <h3>{elem.name}</h3>
            <p>Кабинетов: {elem.cabinets?.length}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewInsitutions;
