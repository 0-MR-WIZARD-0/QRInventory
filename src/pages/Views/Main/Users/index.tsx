import AddNewButton from "components/Basic/Buttons/AddNew";
import { Scenario } from "components/Basic/Scenario";
import { useEffect, useRef, useState } from "react";
import { CreateUserScript } from "./Scenario";
import { useAction, useAppSelector } from "helpers/redux";
import { useListenOnline, useObserver } from "helpers/hooks";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Roles, User } from "types/User";
import { useInView } from "react-intersection-observer";
import { usersViewPath } from "types/App";
import ViewsWrapper from "components/Complex/Wrappers/ViewsWrapper";
import styles from "components/Complex/Wrappers/ViewsWrapper/view.wrapper.module.scss";
import ProtectedComponent from "components/Protected/Component";
import Icon from "components/Basic/Icon";

const paginationSettings = {
  perPage: 5
};

type ViewUserProps = {
  navigate: NavigateFunction;
  user: User;
  lastElementRef?: React.MutableRefObject<HTMLButtonElement | null>;
};
const ViewUser: React.FC<ViewUserProps> = ({ navigate, user, lastElementRef }) => {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <button
      ref={el => {
        ref(el);
        if (lastElementRef) {
          lastElementRef.current = el;
        }
      }}
      onClick={() => {
        navigate(`${usersViewPath}/${user.id}`);
      }}>
      <div className={styles.img}>{user.avatarId && inView ? <img src={`/image/${user.avatarId}`} alt={user.fullName} draggable={false} /> : inView ? <Icon icon='image' /> : <></>}</div>
      <h3>{user.fullName}</h3>
      <ProtectedComponent
        component={
          <div className={styles.info}>
            {/* или в скольких кабинетах учитель присутствует */}
            <p>{user.email}</p>
          </div>
        }
        roles={[Roles.admin]}
      />
    </button>
  );
};

const ViewUsers: React.FC = () => {
  const navigate = useNavigate();
  const createUserModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const institution = useAppSelector(state => state.institution);

  const { data, loading, maxElements, error } = useAppSelector(state => state.viewUsers);
  const { isOnline } = useListenOnline();
  const { fetchUsersThunk } = useAction();
  const [page, setPage] = useState(1);

  const fetchData = () => {
    if (!data || data.length < paginationSettings.perPage * page) {
      return fetchUsersThunk({ page, perPage: paginationSettings.perPage });
    }
  };
  useEffect(() => {
    if (!error && institution.id) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, institution.id]);
  useEffect(() => {
    if (institution.id && error && isOnline && (!data || data.length < paginationSettings.perPage * page)) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isOnline]);

  useEffect(() => {
    setPage(1);
  }, [institution.id]);

  const onLastInView = (entires: IntersectionObserverEntry[]) => {
    if (page * paginationSettings.perPage >= maxElements) return;
    if (!loading && data && data.length < maxElements) {
      if (entires[0].isIntersecting) setPage(p => p + 1);
    }
  };
  const [lastItemRef] = useObserver(onLastInView);

  return (
    <>
      <Scenario ref={createUserModalRef} modalName='create-user' script={CreateUserScript} />
      <ViewsWrapper
        addNewButton={<ProtectedComponent component={<AddNewButton onClick={() => createUserModalRef.current?.createModal()} title='Добавить нового учителя +' />} roles={[Roles.admin]} />}
        children={data ? data.map((user, i) => <ViewUser key={user.id} user={user} navigate={navigate} lastElementRef={error ? undefined : i === data.length - 1 ? lastItemRef : undefined} />) : undefined}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default ViewUsers;
