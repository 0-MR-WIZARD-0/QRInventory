import { Script } from "components/Basic/Scenario";

const DeleteUserScenarioComponent: React.FC = () => {
    return (
      <div>
        <h2>Удаление пользователя</h2>
        <span>Произошла ошибка при удалении пользователя</span>
      </div>
    );
  };
  export const DeleteUserErrorScript: Script = {
    0: {
      content: DeleteUserScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };
  

  const CheckPasswordScenarioComponent: React.FC = () => {
    return (
      <div>
        <h2>Удаление пользователя</h2>
        <span>Введен неверный пароль</span>
      </div>
    );
  };
  export const CheckPasswordErrorScript: Script = {
    0: {
      content: CheckPasswordScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };