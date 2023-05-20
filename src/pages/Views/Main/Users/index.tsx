import AddNewButton from "components/Basic/Buttons/AddNew";
import styles from "./view.main.users.module.scss";
import { Scenario } from "components/Basic/Scenario";
import { useEffect, useRef, useState } from "react";
import { CreateUserScript } from "./Scenario";
import { useAction, useAppSelector } from "helpers/redux";
import { LoadingTransitionComponent } from "components/Basic/Loader";

const ViewUsers: React.FC = () => {
  const createUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const { fetchUsersThunk } = useAction();
  const [page, setPage] = useState(1);
  const nextPage = () => setPage(p => p + 1);
  useEffect(() => {
    fetchUsersThunk({ page, perPage: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const { data, loading } = useAppSelector(state => state.viewUsers);

  return (
    <>
      <Scenario ref={createUserModalRef} modalName='create-user' script={CreateUserScript} />
      <div className={styles.wrapperViewUsers}>
        <AddNewButton onClick={() => createUserModalRef.current?.createModal()} title='Добавить нового учителя +' />
        {data.map(u => (
          <div>{u.fullName}</div>
        ))}
      </div>
      {loading && <LoadingTransitionComponent />}
    </>
  );
};

export default ViewUsers;
