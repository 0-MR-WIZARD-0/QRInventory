import { Link } from "react-router-dom";
import Image from "../Image";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>

      <ul>
        <li>
          <Link to='/'>QR-коды</Link>
        </li>
        <li>
          <Link to='/'>Организации</Link>
        </li>
        <li>
          <Link to='/'>Предметы</Link>
        </li>
        <li>
          <Link to='/'>Пользователи</Link>
        </li>
      </ul>
      <select>
        <option>Колледж бизнес-технологий</option>
      </select>
    </nav>
  );
};

export default Navbar;
