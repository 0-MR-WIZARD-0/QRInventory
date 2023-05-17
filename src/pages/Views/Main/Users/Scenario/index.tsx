import { Script } from "components/Basic/Scenario"
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import {useEffect, useState} from "react"
import { Selector } from "types/Selector";

const CreateUserScenarioComponent: React.FC = () => {

  const [fullname, setFullname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [teacherInstitution, setTeacherInstitution] = useState<Selector[] | undefined>(undefined)

  const { createUsers } = useAction();

  const {valueSelector} = useAppSelector(state=>state.inst)

  useEffect(()=>{
    setTeacherInstitution(valueSelector)
  },[valueSelector])

  const createUser = (fullname: string, email: string, password: string) => {
    (async () => {
      try {
        let res = await api.post("/auth/register", {
          fullName: fullname.toString(),
          email: email.toString(),
          password: password.toString(),
          teacherInstitution: teacherInstitution
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
  }

    return (
      <div>
        <h2>Создание пользователя</h2>
        <input placeholder="ФИО" type="text" onChange={e=>setFullname(e.target.value)}/>
        <input placeholder="Email" type="text" onChange={e=>setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={(e)=>{createUser(fullname, email, password)}}>Создать</button>
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