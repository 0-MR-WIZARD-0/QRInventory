import { Link } from "react-router-dom";
import Image from "../Image";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <select>
        <option>Колледж бизнес-технологий</option>
      </select>
      <ul>
        <li>
          <Link to='/about'>QR-коды</Link>
        </li>
        <li>
          <Link to='/organization'>Организации</Link>
        </li>
        <li>
          <Link to='/about'>Предметы</Link>
        </li>
        <li>
          <Link to='/profile'>Аккаунт</Link>
        </li>
        <Link to='/profile'>
          <Image name={"profile"} />
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
