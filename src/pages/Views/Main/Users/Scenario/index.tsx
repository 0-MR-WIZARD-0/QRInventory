import { Script } from "components/Basic/Scenario";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import { useState } from "react";
import styles from "./view.main.users.scenario.module.scss"
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";

const CreateUserScenarioComponent: React.FC = () => {
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

  return (
    <div className={styles.createUser}>
      <h2>Создание пользователя</h2>
      <Input name='fullName' value={""} onChange={()=>{}} placeholder={""} label='фио' />
      <Input name='email' value={""} onChange={()=>{}} placeholder={"test@email.com"} label='email' />
      <Input name='password' value={""} onChange={()=>{}} label='пароль' type="password"/>
      <DefaultButton component={<>Создать</>} onSumbit={() => {}} />
      {/* <input placeholder='ФИО' type='text' onChange={e => setFullname(e.target.value)} />
      <input placeholder='Email' type='text' onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} /> */}
      {/* <button
        onClick={e => {
          createUser(fullname, email, password);
        }}>
        Создать
      </button> */}
    </div>
  );
};

export const CreateUserScript: Script = {
  0: {
    content: CreateUserScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
