import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Registration from "../pages/Registration";
import "./App.scss";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Organization from "../pages/Organization";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Page404 from "../pages/Page404";
import Audience from "../pages/Audience";

function App() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}

export default App;
