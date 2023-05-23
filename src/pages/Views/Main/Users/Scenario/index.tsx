import { Script } from "components/Basic/Scenario";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import { useState } from "react";
import styles from "./view.main.users.scenario.module.scss"
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { FormProvider, useForm } from "react-hook-form";
import { fullNameValidation, emailValidation, passwordValidation } from "validation/validation";

const CreateUserScenarioComponent: React.FC = () => {

  const methods = useForm({mode: "onBlur"});

  const institution = useAppSelector(state => state.institution);

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { createUsers } = useAction();

  const createUser = (fullname: string, email: string, password: string) => {
    (async () => {
      try {
        let res = await api.post("/auth/register", {
          fullName: fullname,
          email: email,
          password: password,
          teacherInstitution: institution

        });
        if (res.status === 200) {
          createUsers(res.data);
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  })

  return (
    <FormProvider {...methods}>
      <div className={styles.createUser}>
        <h2>Создание пользователя</h2>
        <Input {...fullNameValidation}/>
        <Input {...emailValidation}/>
        <Input {...passwordValidation}/>      
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
