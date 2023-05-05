import ViewElement from "components/Complex/ViewElement";

const UserComponent: React.FC = () => {
  return <></>;
};

const EditUser: React.FC = () => {
  return <ViewElement component={<UserComponent />} />;
};

export default EditUser;
