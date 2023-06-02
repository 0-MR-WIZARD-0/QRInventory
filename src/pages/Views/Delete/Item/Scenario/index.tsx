import { Script } from "components/Basic/Scenario";
import { RejectResponsesAuth } from "redux/actions/auth.actions";

const DeleteItemScenarioComponent: React.FC = () => {
    return (
      <div>
        <h2>Удаление предмета</h2>
        <span>Произошла ошибка при удалении предмета</span>
      </div>
    );
  };
  export const DeleteItemErrorScript: Script = {
    0: {
      content: DeleteItemScenarioComponent,
      onFailure: -1,
      onSuccess: -1
    }
  };
  

  const CheckPasswordScenarioComponent: React.FC = () => {
    return (
      <div>
        <h2>Удаление предмета</h2>
        <span>{RejectResponsesAuth.passwords_mismatch}</span>
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