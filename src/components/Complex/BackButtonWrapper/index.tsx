import BackButton from "components/Basic/Buttons/Back";
import ProtectedComponent from "components/Protected/Component";
import styles from "./back.button.wrapper.module.scss";

type BackButtonWrapperProps = {
  component: React.ReactNode;
};

const BackButtonWrapper: React.FC<BackButtonWrapperProps> = ({ component }) => {
  return (
    <main className={styles.wrapper}>
      <ProtectedComponent component={<BackButton />} />
      <div className={styles.content}>{component}</div>
    </main>
  );
};

export default BackButtonWrapper;
