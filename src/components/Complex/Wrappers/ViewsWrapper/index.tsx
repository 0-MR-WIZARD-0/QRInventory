import { LoadingTransitionComponent } from "components/Basic/Loader";
import ProtectedComponent from "components/Protected/Component";
import { Roles } from "types/User";
import styles from "./view.wrapper.module.scss";

type ViewsWrapperProps = {
  addNewButton: React.ReactNode;
  children: React.ReactNode[] | undefined;
  loading: boolean;
  error: string | undefined;
};
const ViewsWrapper: React.FC<ViewsWrapperProps> = ({ children, addNewButton, loading, error }) => {
  return (
    <div className={styles.wrapper}>
      <ProtectedComponent component={addNewButton} roles={[Roles.admin]} />
      {children !== undefined && children.length > 0 ? (
        children
      ) : (
        <div className={styles.noDataBoundary}>
          <h4>Нет данных</h4>
          <ProtectedComponent component={<p>проверьте выбранное учреждение</p>} roles={[Roles.admin]} />
        </div>
      )}
      {error ? (
        <div className={styles.noDataBoundary}>
          <h4>Произошла ошибка при загрузке данных</h4>
        </div>
      ) : (
        loading === true && <LoadingTransitionComponent />
      )}
    </div>
  );
};

export default ViewsWrapper;
