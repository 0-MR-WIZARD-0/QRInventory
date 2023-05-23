import { ResolverCallback, Script } from "components/Basic/Scenario";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import { useState } from "react";
import styles from "./view.main.users.scenario.module.scss";
import Input from "components/Basic/Input";
import DefaultButton from "components/Basic/Buttons/Default";
import { useAppDispatch } from "redux/store";
import { createUserThunk } from "redux/actions/users.actions";

const CreateUserScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<{ fullName: string; email: string; password: string }>({ email: "", fullName: "", password: "" });
  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => setData(p => ({ ...p, [e.target.name]: e.target.value }));

  const createUser = async () => {
    if (!institution.id) return console.log("Ошибка, не выбрано учреждение");
    const res = await dispatch(createUserThunk({ email: data.email, fullName: data.fullName, password: data.password, teacherInstitution: institution.id }));
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } else {
      return console.log("Ошибка при создании пользователя");
    }
  };

  return (
    <div className={styles.createUser}>
      <h2>Создание пользователя</h2>
      <Input name='fullName' value={data.fullName} onChange={updateData} placeholder={""} label='фио' />
      <Input name='email' value={data.email} onChange={updateData} placeholder={"test@email.com"} label='email' />
      <Input name='password' value={data.password} onChange={updateData} label='пароль' type='password' />
      <DefaultButton component={<>Создать</>} onSumbit={createUser} />
      <button onClick={createUser}>Создать</button>
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
