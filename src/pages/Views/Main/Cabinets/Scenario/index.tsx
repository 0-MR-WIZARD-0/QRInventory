import { ResolverCallback, Script } from "components/Basic/Scenario";
import { useState } from "react";
import { useAppSelector } from "helpers/redux";
import styles from "./view.main.cabinets.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { useAppDispatch } from "redux/store";
import { createCabinetThunk } from "redux/actions/cabinets.actions";

export const CreateCabinetScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();

  const createCabinet = async (value: string) => {
    if (!institution.id) return;
    await dispatch(createCabinetThunk({ institutionId: institution.id, cabinetNumber: value }));
    cb(Promise.resolve(true));
  };

  const [cabinetNumber, setCabinetNumber] = useState<string>("");

  return (
    <div className={styles.createCabinet}>
      <h2>Создание кабинета</h2>
      <Input name='cabinet-number' value={cabinetNumber} onChange={e => setCabinetNumber(e.target.value)} placeholder={"503-А"} label='Номер кабинета' />
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
