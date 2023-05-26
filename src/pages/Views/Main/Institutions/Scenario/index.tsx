import DefaultButton from "components/Basic/Buttons/Default";
import Input from "components/Basic/Input";
import { ResolverCallback, Script } from "components/Basic/Scenario";
import styles from "./view.main.institutions.scenario.module.scss";
import { titleInstitutionValidation } from "validation";
import { FormProvider, useForm } from "react-hook-form";
import { createInstitutionThunk } from "redux/actions/institutions.actions";
import { useAppDispatch } from "redux/store";

export const CreateInstitutionScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const methods = useForm<{ name: string }>({ mode: "onBlur" });
  const dispatch = useAppDispatch();

  const onSubmit = methods.handleSubmit(async data => {
    const res = await dispatch(createInstitutionThunk({ name: data.name }));
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } else {
      return console.log("Ошибка при создании учреждения");
    }
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.createInstitution}>
        <h2>Создание организации</h2>
        <Input {...titleInstitutionValidation} />
        <DefaultButton component={<>Создать</>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};
export const CreateInstitutionScript: Script = {
  0: {
    content: CreateInstitutionScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
