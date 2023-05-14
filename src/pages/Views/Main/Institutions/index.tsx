import styles from "./view.main.institutions.module.scss";
import { useAppSelector } from "helpers/redux";
import { useEffect, useRef, useState } from "react";
import { useAction } from "helpers/redux";
import api from "helpers/axios";
import AddNewButton from "components/Basic/Buttons/AddNew";
import { Scenario } from "components/Basic/Scenario";
import { CreateInstitutionScript } from "./Scenario";

const ViewInsitutions: React.FC = () => {

  const { getInstitution } = useAction();

  const createInstitutionModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const { institutionData } = useAppSelector(state => state.institution);

  useEffect(() => {
    (async  () =>  {
      try {
        let res = await api.get("/institution/all", { params: { full: true } });
        if (res.status === 200) {
          getInstitution(res.data);
        } else {
          console.log(res.data);
        }
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
      <AddNewButton onClick={() => createInstitutionModalRef.current?.createModal()} title='Добавить новое учреждение +'/>
      {institutionData?.map((elem)=>(
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
