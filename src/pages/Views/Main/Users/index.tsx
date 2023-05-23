import AddNewButton from "components/Basic/Buttons/AddNew";
import styles from "./view.main.users.module.scss";
import { Scenario } from "components/Basic/Scenario";
import { useEffect, useRef, useState } from "react";
import { CreateUserScript } from "./Scenario";
import { useAction, useAppSelector } from "helpers/redux";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import { useObserver } from "helpers/hooks";
import ViewItem from "pages/Views/Sub/Item";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "types/User";
import { useInView } from "react-intersection-observer";
import { usersViewPath } from "types/App";

type ViewUserProps = {
  navigate: NavigateFunction;
  user: User;
  lastElementRef?: React.MutableRefObject<HTMLDivElement | null>;
};
const ViewUser: React.FC<ViewUserProps> = ({ navigate, user, lastElementRef }) => {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <div
      ref={el => {
        ref(el);
        if (lastElementRef) {
          lastElementRef.current = el;
        }
      }}
      onClick={() => {
        navigate(`${usersViewPath}/${user.id}`);
      }}>
      {user.avatarId && inView ? <img src={`/image/${user.avatarId}`} alt={user.fullName} draggable={false} /> : <></>}
      {user.fullName}
    </div>
  );
};

const ViewUsers: React.FC = () => {
  const navigate = useNavigate();
  const createUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const { id } = useAppSelector(state => state.institution);

  const { fetchUsersThunk } = useAction();
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchUsersThunk({ page, perPage: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, id]);

  const { data, loading, maxElements } = useAppSelector(state => state.viewUsers);

  const onLastInView = (entires: IntersectionObserverEntry[]) => {
    if (!loading && data && data.length < maxElements) {
      if (entires[0].isIntersecting) setPage(p => p + 1);
    }
  };
  const [lastItemRef] = useObserver(onLastInView);

  return (
    <>
      <Scenario ref={createUserModalRef} modalName='create-user' script={CreateUserScript} />
      <div className={styles.wrapperViewUsers}>
        <AddNewButton onClick={() => createUserModalRef.current?.createModal()} title='Добавить нового учителя +' />
        {data?.map((user, i) => (
          <ViewUser key={user.id} user={user} navigate={navigate} lastElementRef={i === data.length - 1 ? lastItemRef : undefined} />
        ))}
      </div>
      {loading && <LoadingTransitionComponent />}
    </>
  );
};

export default ViewUsers;
