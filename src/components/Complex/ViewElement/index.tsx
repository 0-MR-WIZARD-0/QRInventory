import BackButton from "components/Basic/Buttons/Back";
import { useAppSelector } from "helpers/redux";
import { MenuBarData } from "types/UI";
import { MenuBar } from "../MenuBar";
import styles from "./view.element.module.scss";

type ViewElementProps = {
  component: React.ReactNode;
  controlsTitle: string;
  controls: MenuBarData[];
};

const ViewElement: React.FC<ViewElementProps> = ({ component, controlsTitle, controls }) => {
  //   const {  } = useAppSelector(state => state.auth)
  const ifAuthed = true;

  return (
    <div className={styles.viewElement}>
      {ifAuthed && <BackButton />}
      <main>{component}</main>
      {ifAuthed && (
        <>
          <p>{controlsTitle}</p>
          <MenuBar barOptions={controls} />
        </>
      )}
    </div>
  );
};

export default ViewElement;
