import { useParams } from "react-router-dom";

const ViewCabinet: React.FC = () => {
  const { id } = useParams();

  console.log(id);
  

  return <div>{id}</div>;
};

export default ViewCabinet;
