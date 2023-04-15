import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Main from "../pages/main";
import Registration from "../pages/registration";
import "./App.scss";
import About from "../pages/about";
import Profile from "../pages/profile";
import Organization from "../pages/organization";
import Page404 from "../pages/Page404";
import Audience from "../pages/audience";
import Header from "../components/Header";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Header/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/about' element={<About />} />
        {/* Только авторизированному юзеру */}
        <Route path='/profile' element={<Profile />} /> 
        {/*  */}
        <Route path='/organization' element={<Organization />} />
        <Route path='audience/:id' element={<Audience/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </>
  );
}

export default App;
