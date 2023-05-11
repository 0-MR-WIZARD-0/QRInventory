import { Script } from "components/Basic/Scenario"

const CreateItemScenarioComponent: React.FC = () => {

    return (
      <div>
        <h2>Создание предмета</h2>
        <input placeholder="Номер кабинета"/>
        <input placeholder=""/>
        <button>Создать</button>
      </div>
    );
  };
  export const CreateItemScript: Script = {
    0: {
      content: CreateItemScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };