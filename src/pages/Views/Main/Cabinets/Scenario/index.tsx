import { Script } from "components/Basic/Scenario";
import { useState } from "react";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import styles from "./view.main.cabinets.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { useAppDispatch } from "redux/store";
import { createCabinetThunk } from "redux/actions/cabinets.actions";

export const CreateCabinetScenarioComponent: React.FC = () => {
  const { getCabinetsThunk } = useAction();
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();

  const createCabinet = async (value: string) => {
    if (!institution.id) return;
    let res = await dispatch(createCabinetThunk({ institutionId: institution.id, cabinetNumber: value }));
    if (res.meta.requestStatus === "fulfilled") {
      getCabinetsThunk();
    }
  };

  const [cabinetNumber, setCabinetNumber] = useState<string>("");

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
