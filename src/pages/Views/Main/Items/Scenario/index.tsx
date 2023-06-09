import DefaultButton from "components/Basic/Buttons/Default";
import Input from "components/Basic/Input";
import { ResolverCallback, Script } from "components/Basic/Scenario";
import styles from "./view.main.items.scenario.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { articleValidation, nameValidation } from "validation";
import { useAppDispatch } from "redux/store";
import { createItemThunk } from "redux/actions/items.actions";
import { useAction, useAppSelector } from "helpers/redux";
import { DefaultErrors } from "redux/reducers/errors.reducer";

const CreateItemScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const methods = useForm<{ article: string; name: string }>({ mode: "onBlur" });
  const dispatch = useAppDispatch();
  const institution = useAppSelector(state => state.institution);
  const { addError } = useAction();

  const onSubmit = methods.handleSubmit(async data => {
    if (!institution.id)
      return addError({ type: "item", description: DefaultErrors.institutionNotSelected });
    const res = await dispatch(
      createItemThunk({ institutionId: institution.id, article: data.article, name: data.name })
    );
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } 
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.createItem}>
        <h2>Создание предмета</h2>
        <Input {...articleValidation} />
        <Input {...nameValidation} />
        <DefaultButton component={<>Создать</>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

export const CreateItemScript: Script = {
  0: {
    content: CreateItemScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
