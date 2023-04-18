import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to='/' style={({isActive}) => {
            return {
              backgroundColor: isActive ? "#082032" : "#C5C5C5",
              color: isActive ? "#FFF" : "#000",
            }
          }}>QR-коды</NavLink>
        </li>
        <li>
          <NavLink to='/organizations' style={({isActive}) => {
            return {
              backgroundColor: isActive ? "#082032" : "#C5C5C5",
              color: isActive ? "#FFF" : "#000",
            }
          }}>Организации</NavLink>
        </li>
        <li>
          <NavLink to='/objects' style={({isActive}) => {
            return {
              backgroundColor: isActive ? "#082032" : "#C5C5C5",
              color: isActive ? "#FFF" : "#000",
            }
          }}>Предметы</NavLink>
        </li>
        <li>
          <NavLink to='/users' style={({isActive}) => {
            return {
              backgroundColor: isActive ? "#082032" : "#C5C5C5",
              color: isActive ? "#FFF" : "#000",
            }
          }}>Пользователи</NavLink>
        </li>
      </ul>
      <select>
        <option>Колледж бизнес-технологий</option>
      </select>
    </nav>
  );
};

export default Navbar;
