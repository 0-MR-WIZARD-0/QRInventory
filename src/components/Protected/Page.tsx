import { useAction, useAppSelector } from "helpers/redux";
import { Navigate } from "react-router-dom";
import { UserErrors } from "types/User";

type ProtectedProps = {
  component: React.ReactNode;
  onlyGuest?: true;
};

const ProtectedPage: React.FC<ProtectedProps> = ({ component, onlyGuest }) => {
  const { userData } = useAppSelector(state => state.user);
  const { setError } = useAction();

  if (onlyGuest) {
    if (!userData) return <>{component}</>;
    else return <Navigate to={"/"} />;
  } else {
    if (!userData) {
      setError(UserErrors.user_not_authed);
      return <Navigate to={"/no-access"} />;
    } else return <>{component}</>;
  }
};

export default ProtectedPage;
