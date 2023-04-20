import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import Page404 from "../pages/Page404";
import Header from "../components/Header";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
