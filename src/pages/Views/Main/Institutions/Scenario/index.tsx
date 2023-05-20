import DefaultButton from "components/Basic/Buttons/Default";
import Input from "components/Basic/Input";
import { Script } from "components/Basic/Scenario";
import api from "helpers/axios";
import { useState } from "react";
import styles from "./view.main.institutions.scenario.module.scss"

export const CreateInstitutionScenarioComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  // const { postInstitution } = useAction();

  const createInstitution = (value: string) => {
    (async () => {
      try {
        let res = await api.post("/institution/create", { name: `${value}` });
        if (res.status === 200) {
          // postInstitution(res.data);
          // getInstitution(res.data)
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div className={styles.createInstitution}>
      <h2>Создание организации</h2>
      <Input name='institution' value={""} onChange={()=>{}} placeholder={"КБТ"} label='Название организации' />
      <DefaultButton component={<>Создать</>} onSumbit={() => {}} />
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
