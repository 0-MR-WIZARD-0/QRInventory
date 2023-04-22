import { NavLink } from "react-router-dom";
import { MenuBarData } from "types/UI";
import styles from "./menuBar.module.scss";

type MenuBarProps = {
  barOptions: MenuBarData[];
};

export const MenuBar: React.FC<MenuBarProps> = ({ barOptions }) => {
  return (
    <ul className={styles.menuBar}>
      {barOptions.map((d, i) => (
        <li key={d.link + i}>
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
  );
};
