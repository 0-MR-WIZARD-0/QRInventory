import { NavLink } from "react-router-dom";

import Selector from "../Selector";
import styles from "./navbar.module.scss";

type NavbarMenuData = {
  link: string;
  title: string;
};

const data: NavbarMenuData[] = [
  {
    link: "/",
    title: "QR-коды"
  },
  {
    link: "/organizations",
    title: "Организации"
  },
  {
    link: "/objects",
    title: "Предметы"
  },
  {
    link: "/users",
    title: "Пользователи"
  },
  {
    link: "/users",
    title: "Пользователи"
  },
  {
    link: "/users",
    title: "Пользователи"
  },
  {
    link: "/users",
    title: "Пользователи"
  }
];

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        {data.map(d => (
          <li>
            <NavLink
              to={d.link}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#082032" : "#FFF",
                  color: isActive ? "#FFF" : "#000"
                };
              }}>
              {d.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <Selector />
    </nav>
  );
};

export default Navbar;
