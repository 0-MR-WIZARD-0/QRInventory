import { loaderAlt } from "types/UI";
import styles from "./loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src={`/resources/loader.gif`} draggable={false} alt={loaderAlt} />
    </div>
  );
};

export default Loader;
