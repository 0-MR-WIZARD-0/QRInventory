import { Navigate } from "react-router-dom";

type ProtectedProps = {
  component: React.ReactNode;
};

const ProtectedPage: React.FC<ProtectedProps> = ({ component }) => {
  const auth = false;

  if (!auth) return <Navigate to={"/no-access"} />;
  else return <>{component}</>;
};

export default ProtectedPage;
