import { useAppSelector } from "helpers/redux";
import { ResolverCallback, Script } from "components/Basic/Scenario";
import styles from "./view.main.cabinets.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { useAppDispatch } from "redux/store";
import { createCabinetThunk } from "redux/actions/cabinets.actions";
import { useForm, FormProvider } from "react-hook-form";
import { cabinetValidation } from "validation/validation";
  
export const CreateCabinetScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
    
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();

  const methods = useForm({mode: "onBlur"});

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!institution.id) return console.log("Ошибка, не выбрано учреждение");
    const res = await dispatch(createCabinetThunk({ institutionId: institution.id, cabinetNumber: data.cabinetNumber}));
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } else {
      return console.log("Ошибка при создании кабинета");
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