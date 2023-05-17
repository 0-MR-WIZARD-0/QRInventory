import AddNewButton from "components/Basic/Buttons/AddNew";
import styles from "./view.main.users.module.scss";
import { Scenario } from "components/Basic/Scenario";
import { useEffect, useRef } from "react"
import { CreateUserScript } from "./Scenario";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";

const ViewUsers: React.FC = () => {

  const createUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  useEffect(() => {
    (async () => {
      await api.get("/user/all").then(res => {
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      <Scenario ref={createUserModalRef} modalName='create-user' script={CreateUserScript}/>
      <div className={styles.wrapperViewUsers}>
        <AddNewButton onClick={() => createUserModalRef.current?.createModal()} title='Добавить нового учителя +' />
      </div>
    </>
  );
};

export default ViewUsers;
