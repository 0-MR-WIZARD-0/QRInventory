import { useAppSelector } from "helpers/redux";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  component: React.ReactNode;
  onlyGuest?: true;
};

const ProtectedPage: React.FC<ProtectedProps> = ({ component, onlyGuest }) => {
  const { userData } = useAppSelector(state => state.user);

  if (onlyGuest) {
    if (!userData) return <>{component}</>;
    else return <Navigate to={"/"} />;
  } else {
    if (!userData) return <Navigate to={"/no-access"} />;
    else return <>{component}</>;
  }
};

export default ProtectedPage;
