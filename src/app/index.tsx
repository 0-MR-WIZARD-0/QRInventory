import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Main from "pages/Main";
import Profile from "pages/Profile";
import Page404 from "pages/Page404";
import Header from "components/Header";
import styles from "./app.module.scss";
import NoAccessPage from "pages/NoAccess";
import ProtectedPage from "components/Protected/Page";
import { useEffect } from "react";
import api from "helpers/axios";
import { useAction, useAppSelector } from "helpers/redux";

const LoadingComponent: React.FC = () => {
  return <h3>Идёт загрузка</h3>;
};

function App() {
  const { updateUser, setLoading } = useAction();
  const { loading } = useAppSelector(state => state.user);

  useEffect(() => {
    (async () => {
      await api
        .get("/user")
        .then(res => {
          updateUser(res.data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      {loading ? (
        <LoadingComponent />
      ) : (
        <Routes>
          <Route index element={<ProtectedPage component={<Main />} />} />
          <Route path='signin' element={<ProtectedPage component={<Login />} onlyGuest />} />
          <Route path='profile' element={<ProtectedPage component={<Profile />} />} />
          <Route path='no-access' element={<NoAccessPage />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
