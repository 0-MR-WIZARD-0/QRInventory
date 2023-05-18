import { Script } from "components/Basic/Scenario";
import { useState } from "react";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import styles from "./view.main.cabinets.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";

export const CreateCabinetScenarioComponent: React.FC = () => {

  const { updateCabinets } = useAction();

  const institution = useAppSelector(state => state.institution);

  // const { userData } = useAppSelector(state => state.user);

  // const [institution, setInstitution] = useState<Selector[] | undefined>(undefined);
  const [cabinetNumber, setCabinetNumber] = useState<string>("");

  // useEffect(() => {
  //   setInstitution(valueSelector);
  // }, [valueSelector]);

  const createCabinet = (value: string) => {
    // (async () => {
    //   try {
    //     let res = await api.post("/cabinet/create", { institution: institution.id, cabinetNumber: value });
    //     if (res.status === 200) {
    //       await api.get("/cabinet/all").then(res => {
    //         updateCabinets(res.data);
    //       });

    //     } else {
    //       // console.log(res.data);
    //       // setError("Произошла ошибка при создании кабинета");
    //     }
    //     }
    //   } catch (error) {
    //     // console.log(error);
    //     // setError("Произошла ошибка при создании кабинета");
    //   }
    // })();
  };

  return (
    <div className={styles.createCabinet}>
      <h2>Создание кабинета</h2>
      {/* <input onChange={e => setCabinetNumber(e.target.value)} placeholder='Номер кабинета' /> */}
      <Input name='cabinet-number' value={cabinetNumber} onChange={e => setCabinetNumber(e.target.value)} placeholder={"503-А"} label='Номер кабинета' />
      {/* <button onClick={() => createCabinet(cabinetNumber)}>Создать</button> */}
      <DefaultButton component={<>Создать</>} onSumbit={() => createCabinet(cabinetNumber)} />
    </div>
  );
};

export const CreateCabinetScript: Script = {
  0: {
    content: CreateCabinetScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
