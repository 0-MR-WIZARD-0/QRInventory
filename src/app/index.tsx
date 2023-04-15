import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/main";
import Registration from "../pages/registration";
import "./App.scss";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Organization from "../pages/Organization";
import Page404 from "../pages/Page404";
import Audience from "../pages/audience";
import Header from "../components/Header";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;