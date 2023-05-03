import BackButton from "components/Basic/Buttons/Back";
import ProtectedComponent from "components/Protected/Component";
import styles from "./view.element.module.scss";

type ViewElementProps = {
  component: React.ReactNode;
};

const ViewElement: React.FC<ViewElementProps> = ({ component }) => {
  return (
    <div className={styles.viewElement}>
      <ProtectedComponent component={<BackButton />} />
      <main>{component}</main>
    </div>
  );
};

export default ViewElement;
