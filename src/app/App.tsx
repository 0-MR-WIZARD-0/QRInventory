import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Registration from "../pages/Registration/Registration";
import "./App.scss";
import About from "../pages/About/About";
import Profile from "../pages/Profile/Profile";
import Organization from "../pages/Organization/Organization";
import Objects from "../pages/Object/Object";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <Route path='/object' element={<Objects />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
