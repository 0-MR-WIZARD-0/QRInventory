type ProtectedProps = {
  component: React.ReactNode;
};

const ProtectedComponent: React.FC<ProtectedProps> = ({ component }) => {
  const auth = false;

  if (!auth) return <></>;
  else return <>{component}</>;
};

export default ProtectedComponent;
