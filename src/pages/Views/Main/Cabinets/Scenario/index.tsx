import { useAction, useAppSelector } from "helpers/redux";
import { ResolverCallback, Script } from "components/Basic/Scenario";
import styles from "./view.main.cabinets.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { useAppDispatch } from "redux/store";
import { RejectResponsesCabinet, createCabinetThunk } from "redux/actions/cabinets.actions";
import { useForm, FormProvider } from "react-hook-form";
import { cabinetValidation } from "validation";
import { DefaultErrors } from "redux/reducers/errors.reducer";

export const CreateCabinetScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();
  const { addError } = useAction();

  const methods = useForm({ mode: "onBlur" });

  const onSubmit = methods.handleSubmit(async data => {
    if (!institution.id) return addError({ type: "cabinet", description: DefaultErrors.institutionNotSelected });

    const res = await dispatch(
      createCabinetThunk({ institutionId: institution.id, cabinetNumber: data.cabinetNumber })
    );

    if (res.meta.requestStatus === "fulfilled") cb(Promise.resolve(true));
    
    // else
    //   return addError({ type: "cabinet", description: RejectResponsesCabinet.createCabinetError });
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.createCabinet}>
        <h2>Создание кабинета</h2>
        <Input {...cabinetValidation} />
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
