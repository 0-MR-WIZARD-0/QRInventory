import { Script } from "components/Basic/Scenario"
import api from "helpers/axios";
import { useAction } from "helpers/redux";
import {useState} from "react"

export const CreateInstitutionScenarioComponent: React.FC = () => {

  const [input, setInput] = useState<string>("");
  // const { postInstitution,  } = useAction();

  const createInstitution = (value: string) => {
    (async () => {
      try {
        let res = await api.post("/institution/create", {name: `${value}`});
        if (res.status === 200) {
          // postInstitution(res.data);
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
        <h2>Создание организации</h2>
        <input type="text" placeholder="Название учреждения" onChange={e => setInput(e.target.value)}/>
        <button 
          onClick={()=>{createInstitution(input)}}
        >Создать</button>
      </div>
    );
  };
  export const CreateInstitutionScript: Script = {
    0: {
      content: CreateInstitutionScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };