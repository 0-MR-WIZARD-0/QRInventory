import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Registration from "../pages/Registration";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Organization from "../pages/Organization";
import Page404 from "../pages/Page404";
import Audience from "../pages/Audience";
import Header from "../components/Header";

import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/organization' element={<Organization />} />
        <Route path='audience/:id' element={<Audience />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
