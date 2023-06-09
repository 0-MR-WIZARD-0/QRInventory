import { Script } from "components/Basic/Scenario";
import { RejectResponsesAuth } from "redux/actions/auth.actions";
import { RejectResponsesUser } from "redux/actions/users.actions";

const DeleteUserScenarioComponent: React.FC = () => {
  return (
    <div>
      <h2>Удаление пользователя</h2>
      <span>{RejectResponsesUser.deleteUserError}</span>
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
