import ViewElement from "components/Complex/ViewElement";

const ItemComponent: React.FC = () => {
  return <></>;
};

const EditItem: React.FC = () => {
  return <ViewElement component={<ItemComponent />} />;
};

export default EditItem;
