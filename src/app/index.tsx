import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Transition } from "react-transition-group";

import { Roles } from "types/User";
import { MainViewRoutes, RoutesEnum } from "types/Routes";
import { useAction, useAppSelector } from "helpers/redux";
import api from "helpers/axios";
import styles from "./app.module.scss";

import Login from "pages/Auth/Login";
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
import EditCabinet from "pages/Views/Edit/Cabinets";
import EditItem from "pages/Views/Edit/Item";
import EditUser from "pages/Views/Edit/User";
import Logout from "pages/Auth/Logout";
import DeleteCabinet from "pages/Views/Delete/Cabinet";

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
            <Route path={MainViewRoutes.items} element={<ProtectedPage component={<ViewItems />} roles={[Roles.admin, Roles.teacher]} />} />
            <Route path={MainViewRoutes.users} element={<ProtectedPage component={<ViewUsers />} roles={[Roles.admin]} />} />
          </Route>
          <Route path={RoutesEnum.view}>
            <Route path={`${MainViewRoutes.cabinets}/:id`} element={<ProtectedPage component={<Outlet />} roles={[Roles.admin, Roles.teacher]} />}>
              <Route index element={<ViewCabinet />} />
              <Route path='edit' element={<EditCabinet />} />
              <Route path='delete' element={<DeleteCabinet/>}/>
            </Route>
            <Route path={`${MainViewRoutes.items}/:id`} element={<ProtectedPage component={<Outlet />} roles={[Roles.admin]} />}>
              <Route index element={<ViewItem />} />
              <Route path='edit' element={<EditItem />} />
              <Route path='delete' element={""}/>
            </Route>
            <Route path={`${MainViewRoutes.users}/:id`}>
              <Route index element={<ViewUser />} />
              <Route path='edit' element={<EditUser />} />
              <Route path='delete' element={""}/>
            </Route>
          </Route>
          <Route path={RoutesEnum.auth}>
            <Route path={RoutesEnum.signIn} element={<ProtectedPage component={<Login />} onlyGuest />} />
            <Route path={RoutesEnum.logout} element={<Logout />} />
          </Route>
          <Route path={RoutesEnum.profile}>
            <Route index element={<ProtectedPage component={<ViewUser />} />} />
            <Route path='edit' element={<EditUser />} />
          </Route>
          <Route path={RoutesEnum.noAccess} element={<NoAccessPage />} />
          <Route path={RoutesEnum.all} element={<Page404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
