import { Script } from "components/Basic/Scenario"
import {useState, useEffect} from "react"
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";
import { Selector } from "types/Selector";

export const CreateCabinetScenarioComponent: React.FC = () => {
  
  const { postInstitution } = useAction();

  const {valueSelector} = useAppSelector(state=>state.inst)
  
  const { userData } = useAppSelector(state => state.user);
  console.log(userData?.teacherInstitution);

  const [institution, setInstitution] = useState<Selector[] | undefined>(undefined)
  const [cabinetNumber, setCabinetNumber] = useState<string>("")

  useEffect(()=>{
    setInstitution(valueSelector)
  },[valueSelector])
  
  
  const createCabinet = (value: string) => {
    (async () => {
      try {
        let res = await api.post("/cabinet/create", {institution: institution, cabinetNumber: value});
        if (res.status === 200) {
          // updateInstitution(res.data);
          postInstitution(res.data)
          console.log(res.data);
          
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
          <h2>Создание кабинета</h2>
          <input onChange={e => setCabinetNumber(e.target.value)} placeholder="Номер кабинета"/>
          <button onClick={()=>createCabinet(cabinetNumber)}>Создать</button>
        </div>
    );

  };


  export const CreateCabinetScript: Script = {
    0: {
      content: CreateCabinetScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };