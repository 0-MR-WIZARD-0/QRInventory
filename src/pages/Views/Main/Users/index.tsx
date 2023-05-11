import AddNewButton from "components/Basic/Buttons/AddNew";
import styles from "./view.main.users.module.scss";
import { Scenario } from "components/Basic/Scenario";
import {useRef} from "react"
import { CreateUserScript } from "./Scenario";

const ViewUsers: React.FC = () => {

  const createUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  return (
    <>
      <Scenario ref={createUserModalRef} modalName='create-user' script={CreateUserScript} />
      <div className={styles.wrapperViewUsers}>
        <AddNewButton onClick={() => createUserModalRef.current?.createModal()} title='Добавить нового учителя +' />
      </div>
    </>
  );
};

export default ViewUsers;
