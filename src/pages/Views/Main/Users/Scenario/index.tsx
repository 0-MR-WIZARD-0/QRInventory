import { Script } from "components/Basic/Scenario"

const CreateUserScenarioComponent: React.FC = () => {

    return (
      <div>
        <h2>Создание пользователя</h2>
        <input placeholder="ФИО"/>
        <input placeholder="Email"/>
        <input placeholder="Password"/>
        <button>Создать</button>
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