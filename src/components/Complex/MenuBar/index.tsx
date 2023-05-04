import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuBarData } from "types/UI";
import styles from "./menuBar.module.scss";

type MenuBarProps = {
  barOptions: MenuBarData[];
  optionAsNavlink?: true;
};

export const MenuBar: React.FC<MenuBarProps> = ({ barOptions, optionAsNavlink }) => {
  const [barDrag, setBarDrag] = useState({
    isDragging: false,
    clientX: 0,
    dragX: 0
  });

  const onMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (ref && ref.current && !ref.current.contains(e.currentTarget)) return;
    if (!ref || !ref.current) return;
    e.preventDefault();
    const { clientX, dragX, isDragging } = barDrag;

    if (isDragging) {
      const dragValue = dragX + e.clientX - clientX;
      ref.current.scrollLeft = dragValue * -1;
      setBarDrag(state => ({ ...state, dragX: dragValue, clientX: e.clientX }));
    }
  };
  const onMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (ref && ref.current && !ref.current.contains(e.currentTarget)) return;
    e.preventDefault();
    setBarDrag(state => ({ ...state, isDragging: true, clientX: e.clientX }));
  };
  const onMouseUp = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (ref && ref.current && !ref.current.contains(e.currentTarget)) return;
    e.preventDefault();
    setBarDrag(state => ({ ...state, isDragging: false }));
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (ref && ref.current && !ref.current.contains(e.currentTarget)) return;
    e.preventDefault();
    setBarDrag(state => ({ ...state, isDragging: false }));
  };

  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const bar = ref.current;
    if (bar) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        bar.scrollTo({
          left: bar.scrollLeft + e.deltaY * 10,
          behavior: "smooth"
        });
      };
      bar.addEventListener("wheel", onWheel);

      return () => bar.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <ul className={styles.menuBar} ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {barOptions.map((d, i) => (
        <li key={d.link + i}>
          {optionAsNavlink ? (
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
          ) : (
            <Link to={d.link}>{d.title}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};
