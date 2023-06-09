import { Script } from "components/Basic/Scenario";
import { RejectResponsesAuth } from "redux/actions/auth.actions";
import { RejectResponsesCabinet } from "redux/actions/cabinets.actions";

const DeleteCabinetScenarioComponent: React.FC = () => {
  return (
    <div>
      <h2>Удаление кабинета</h2>
      <span>{RejectResponsesCabinet.deleteCabinetError}</span>
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
