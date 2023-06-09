import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { Roles } from "types/User";
import { MainViewRoutes, RoutesEnum } from "types/Routes";
import { useAction, useAppSelector } from "helpers/redux";
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
import EditCabinet from "pages/Views/Edit/Cabinet";
import EditItem from "pages/Views/Edit/Item";
import EditUser from "pages/Views/Edit/User";
import Logout from "pages/Auth/Logout";
import { LoadingTransitionComponent } from "components/Basic/Loader";

import BackButtonWrapper from "components/Complex/Wrappers/BackButtonWrapper";

function App() {
  const { fetchUserThunk } = useAction();
  const { loading } = useAppSelector(state => state.user);

  useEffect(() => {
    fetchUserThunk({ initial: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      {loading ? (
        <LoadingTransitionComponent />
      ) : (
        <Routes>
          <Route path={RoutesEnum.auth}>
            <Route path={RoutesEnum.signIn} element={<ProtectedPage component={<Login />} onlyGuest />} />
            <Route path={RoutesEnum.logout} element={<Logout />} />
          </Route>
          <Route path={RoutesEnum.main} element={<ProtectedPage component={<Main />} />}>
            <Route index element={<Navigate to={MainViewRoutes.cabinets} />} />
            <Route path={MainViewRoutes.cabinets} element={<ProtectedPage component={<ViewCabinets />} roles={[Roles.admin, Roles.teacher]} />} />
            <Route path={MainViewRoutes.institutions} element={<ProtectedPage component={<ViewInstitutions />} roles={[Roles.admin]} />} />
            <Route path={MainViewRoutes.items} element={<ProtectedPage component={<ViewItems />} roles={[Roles.admin, Roles.teacher]} />} />
            <Route path={MainViewRoutes.users} element={<ProtectedPage component={<ViewUsers />} roles={[Roles.admin]} />} />
          </Route>
          <Route path={RoutesEnum.view} element={<BackButtonWrapper component={<Outlet />} />}>
            <Route path={`${MainViewRoutes.cabinets}/:id`}>
              <Route index element={<ViewCabinet />} />
              <Route path='edit' element={<ProtectedPage component={<EditCabinet />} roles={[Roles.admin, Roles.teacher]} />} />
              {/* <Route path='delete' element={<ProtectedPage component={<DeleteCabinet />} roles={[Roles.admin, Roles.teacher]} />} /> */}
            </Route>
            <Route path={`${MainViewRoutes.items}/:id`}>
              <Route index element={<ViewItem />} />
              <Route path='edit' element={<ProtectedPage component={<EditItem />} roles={[Roles.admin, Roles.teacher]} />} />
              {/* <Route path='delete' element={<ProtectedPage component={<DeleteItem />} roles={[Roles.admin, Roles.teacher]} />} /> */}
            </Route>
            <Route path={`${MainViewRoutes.users}/:id`}>
              <Route index element={<ViewUser />} />
              <Route path='edit' element={<ProtectedPage component={<EditUser />} roles={[Roles.admin]} />} />
              {/* <Route path='delete' element={<ProtectedPage component={<DeleteUser />} roles={[Roles.admin, Roles.teacher]} />} /> */}
            </Route>
          </Route>
          <Route path={RoutesEnum.profile} element={<ProtectedPage component={<BackButtonWrapper component={<Outlet />} />} />}>
            <Route index element={<ViewUser />} />
            <Route path='edit' element={<EditUser />} />
          </Route>
          <Route path={RoutesEnum.noAccess} element={<BackButtonWrapper component={<NoAccessPage />} />} />
          <Route path={RoutesEnum.all} element={<BackButtonWrapper component={<Page404 />} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
