import { Script } from "components/Basic/Scenario"
import {useState} from "react"
import api from "helpers/axios";
import { QRCodeSVG } from "qrcode.react";

const CreateCabinetScenarioComponent: React.FC = () => {

  const [cabinetNumber, setCabinetNumber] = useState<string>("")

  const createCabinet = (value: string) => {
    (async () => {
      try {
        let res = await api.post("/cabinet/create", {institution: "", cabinetNumber: `${value}`});
        if (res.status === 200) {
          // updateInstitution(res.data);
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