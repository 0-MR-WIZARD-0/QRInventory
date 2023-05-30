import { ResolverCallback, Script } from "components/Basic/Scenario";
import { useAppSelector } from "helpers/redux";
import styles from "./view.main.users.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { FormProvider, useForm } from "react-hook-form";
import { fullNameValidation, emailValidation, passwordValidation } from "validation";
import { useAppDispatch } from "redux/store";
import { createUserThunk } from "redux/actions/users.actions";

const CreateUserScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const methods = useForm({ mode: "onBlur" });
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();

  const onSubmit = methods.handleSubmit(async data => {
    if (!institution.id) return console.log("Ошибка, не выбрано учреждение");
    const res = await dispatch(createUserThunk({ email: data.email, fullName: data.fullName, password: data.password, teacherInstitution: institution.id }));
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } else {
      return console.log("Ошибка при создании пользователя");
    }
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.createUser}>
        <h2>Создание пользователя</h2>
        <Input {...fullNameValidation} />
        <Input {...emailValidation} />
        <Input {...passwordValidation} />
        <DefaultButton component={<>Создать</>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

export const CreateUserScript: Script = {
  0: {
    content: CreateUserScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
