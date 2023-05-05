import AddNewButton from "components/Basic/Buttons/AddNew";
import styles from "./view.main.users.module.scss";

const ViewUsers: React.FC = () => {
  return (
    <div className={styles.wrapperViewUsers}>
      <AddNewButton onClick={() => {}} title='Добавить нового учителя +' />
    </div>
  );
};

export default ViewUsers;
