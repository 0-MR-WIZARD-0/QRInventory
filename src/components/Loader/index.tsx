import { TransitionStatus } from "react-transition-group";
import { loaderAlt, TransitionStyles } from "types/UI";
import styles from "./loader.module.scss";

const Loader: React.FC<{ state: TransitionStatus }> = ({ state }) => {
  const transitionStyles: TransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };

  return (
    <div className={styles.loader} style={{ ...transitionStyles[state as keyof TransitionStyles] }}>
      <img src={`/resources/loader.gif`} draggable={false} alt={loaderAlt} />
    </div>
  );
};

export default Loader;
