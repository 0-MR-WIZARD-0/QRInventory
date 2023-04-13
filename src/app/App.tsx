import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Main from "../pages/main/Main";
import Registration from "../pages/registration/Registration";
import "./App.scss";
import About from "../pages/about/About";
import Profile from "../pages/profile/Profile";
import Organization from "../pages/organization/Organization";
// import Objects from "../pages/object/Object";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Page404 from "../pages/Page404/404Page";
import Audience from "../pages/audience/Audience";

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
        {/* <Route path='/object' element={<Objects />} /> */}
        <Route path='audience/:id' element={<Audience/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
