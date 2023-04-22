import { useAppSelector } from "helpers/redux";
import { Roles } from "types/User";

type ProtectedProps = {
  component: React.ReactNode;
  roles?: Roles[];
};

const ProtectedComponent: React.FC<ProtectedProps> = ({ component, roles }) => {
  const { userData } = useAppSelector(state => state.user);

  if (!userData) return <></>;
  else {
    if (roles) {
      if (roles.includes(userData.role)) return <>{component}</>;
      else return <></>;
    } else return <>{component}</>;
  }
};

export default ProtectedComponent;
