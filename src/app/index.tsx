import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Transition } from "react-transition-group";

import { Roles } from "types/User";
import { MainViewRoutes, RoutesEnum } from "types/Routes";
import { useAction, useAppSelector } from "helpers/redux";
import api from "helpers/axios";
import styles from "./app.module.scss";

import Login from "pages/Login";
import Main from "pages/Main";
import Page404 from "pages/Page404";
import NoAccessPage from "pages/NoAccess";

import Header from "components/Complex/Header";
import ProtectedPage from "components/Protected/Page";

import ViewCabinets from "pages/Views/Main/Cabinets";
import ViewInstitutions from "pages/Views/Main/Institutions";
import ViewItems from "pages/Views/Main/Items";
import ViewUsers from "pages/Views/Main/Users";

import ViewUser from "pages/Views/Sub/User";
import ViewCabinet from "pages/Views/Sub/Cabinet";
import ViewItem from "pages/Views/Sub/Item";
import { LoadingTransitionComponent } from "components/Basic/Loader";
import NoSelect from "pages/Views/Main/NoSelect";

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
        <LoadingTransitionComponent />
      ) : (
        <Routes>
          <Route path={RoutesEnum.main} element={<ProtectedPage component={<Main />} />}>
            <Route index element={<NoSelect />} />
            <Route path={MainViewRoutes.cabinets} element={<ProtectedPage component={<ViewCabinets />} roles={[Roles.admin, Roles.teacher]} />} />
            <Route path={MainViewRoutes.institutions} element={<ProtectedPage component={<ViewInstitutions />} roles={[Roles.admin]} />} />
            <Route path={MainViewRoutes.items} element={<ProtectedPage component={<ViewItems />} roles={[Roles.admin]} />} />
            <Route path={MainViewRoutes.users} element={<ProtectedPage component={<ViewUsers />} roles={[Roles.admin]} />} />
          </Route>
          {/* https://stackoverflow.com/questions/64890293/react-router-v6-nested-routing-without-outlet */}
          <Route path={RoutesEnum.view}>
            {/* https://stackoverflow.com/questions/63214924/how-to-return-a-page-by-id-with-react-routing */}
            {/* стейт будет автоматически из rtk query браться методом из апи или будем прокидывать просами? (не пропдриллинг)*/}
            <Route path={`${MainViewRoutes.cabinets}/:id`} element={<ProtectedPage component={<Outlet />} roles={[Roles.admin, Roles.teacher]} />}>
              <Route index element={<ViewCabinet />} />
              <Route path='edit' element={<div>изменение кабинета под администратором</div>} />
            </Route>

            {/* при нажатии на учреждение будет менять учреждение в стейте, поэтому страницы учреждения скорее всего не будет */}
            {/* <Route path={MainViewRoutes.institutions} element={<ProtectedPage component={<ViewCabinets />} roles={[Roles.admin]} />} /> */}

            <Route path={`${MainViewRoutes.items}/:id`} element={<ProtectedPage component={<Outlet />} roles={[Roles.admin]} />}>
              <Route index element={<ViewItem />} />
              <Route path='edit' element={<div>изменение предмета под администратором</div>} />
            </Route>
            <Route path={`${MainViewRoutes.users}/:id`}>
              <Route index element={<ViewUser />} />
              <Route path='edit' element={<div>изменение пользователя</div>} />
            </Route>
          </Route>
          <Route path={RoutesEnum.signIn} element={<ProtectedPage component={<Login />} onlyGuest />} />
          <Route path={RoutesEnum.profile}>
            <Route index element={<ProtectedPage component={<ViewUser />} />} />
            <Route path='edit' element={<div>тот же компонент что и в users/:id/edit</div>} />
          </Route>
          <Route path={RoutesEnum.noAccess} element={<NoAccessPage />} />
          <Route path={RoutesEnum.all} element={<Page404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
