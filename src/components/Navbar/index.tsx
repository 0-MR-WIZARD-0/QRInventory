import { Link } from "react-router-dom";
import Image from "../Image";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to='/'>
        <Image name={"logo"} />
      </Link>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {/* <li><Link to="/organization">Add organization</Link></li>  */}
        {/* Данная ссылка добавляется только для админа */}
        <Link to='/profile'>
          <Image name={"profile"} />
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
