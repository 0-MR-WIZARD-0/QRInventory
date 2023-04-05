import "./Navbar.scss"
import Logo from "../../resources/logo.png"
import Profile from "../../resources/profile.png"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
        <Link to="/"><img src={Logo}></img></Link>
        <ul>
            <li><Link to="/about">About</Link></li>
            {/* <li><Link to="/organization">Add organization</Link></li> */}
            <li><Link to="/object">Add objects</Link></li>
            <Link to="/profile"><img src={Profile} alt=""/></Link>

        </ul>
    </nav>
  )
}

export default Navbar