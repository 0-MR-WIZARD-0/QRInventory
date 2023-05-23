import { Script } from "components/Basic/Scenario";
import { useEffect, useRef, useState } from "react";
import { useAction, useAppSelector } from "helpers/redux";
import styles from "./view.main.cabinets.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { useAppDispatch } from "redux/store";
import { createCabinetThunk } from "redux/actions/cabinets.actions";
import { useForm, FormProvider } from "react-hook-form";
import { cabinetValidation } from "validation/validation";

export const CreateCabinetScenarioComponent: React.FC = () => {

  const { getCabinetsThunk } = useAction();
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();
  
  const methods = useForm({mode: "onBlur"});

  const onSubmit = methods.handleSubmit( async () => {
    if (!institution.id) return;
      let res = await dispatch(createCabinetThunk({ institutionId: institution.id, cabinetNumber: methods.getValues("cabinetNumber") }));
      if (res.meta.requestStatus === "fulfilled") {
        getCabinetsThunk();
    }
  })

  return (
    <FormProvider {...methods}>
    <div className={styles.createCabinet}> 
      <h2>Создание кабинета</h2>
        <Input {...cabinetValidation}/>
      <DefaultButton component={<>Создать</>} onSumbit={onSubmit} />
    </div> 
    </FormProvider>
  );
};

export const CreateCabinetScript: Script = {
  0: {
    content: CreateCabinetScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};