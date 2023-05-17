import { Script } from "components/Basic/Scenario";

const DeleteCabinetScenarioComponent: React.FC = () => {
    return (
      <div>
        <h2>Удаление кабинета</h2>
        <span>Произошла ошибка при удалении кабинета</span>
      </div>
    );
  };
  export const DeleteCabinetErrorScript: Script = {
    0: {
      content: DeleteCabinetScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };
  

  const CheckPasswordScenarioComponent: React.FC = () => {
    return (
      <div>
        <h2>Удаление кабинета</h2>
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
  