import { useAction, useAppSelector } from "helpers/redux";
import { Navigate } from "react-router-dom";
import { RoutesEnum } from "types/Routes";
import { Roles, UserErrors } from "types/User";

type ProtectedProps = {
  component: React.ReactNode;
  onlyGuest?: true;
  roles?: Roles[];
};

const ProtectedPage: React.FC<ProtectedProps> = ({ component, onlyGuest, roles }) => {
  const { userData } = useAppSelector(state => state.user);
  const { setError } = useAction();

  if (onlyGuest) {
    if (!userData) return <>{component}</>;
    else return <Navigate to={RoutesEnum.main} />;
  } else {
    if (!userData) {
      setError(UserErrors.user_not_authed);
      return <Navigate to={`/${RoutesEnum.noAccess}`} />;
    } else {
      if (roles) {
        if (roles.includes(userData.role)) return <>{component}</>;
        else {
          setError(UserErrors.user_not_authed);
          return <Navigate to={`/${RoutesEnum.noAccess}`} />;
        }
      } else return <>{component}</>;
    }
  }
};

export default ProtectedPage;
