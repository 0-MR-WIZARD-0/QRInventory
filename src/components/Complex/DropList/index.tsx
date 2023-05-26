import React, { useState, useRef } from "react";
import styles from "./droplist.module.scss";
import { Item } from "types/Item";
import Search from "components/Basic/Search";

import { Teacher } from "types/Teacher";

// type Props = {
  // items?: Item[];
  // teachers?: Teacher[];
  // cabinetId?: string;
// };

interface Option {
  key: string;
  name: string;
  value: string;
}

interface DropDownProps {
  options: Option[];
  enableSearch?: boolean;
}

const DropList: React.FC<DropDownProps> = ({ options, enableSearch = false }) => {
  const container = useRef<HTMLInputElement>(null);

  const [dropdownState, setDropdownState] = useState({ open: false });

  const changeDropList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (container.current && !container.current.contains(e.target as HTMLButtonElement)) {
      setDropdownState({ open: false });
    } else {
      setDropdownState({ open: !dropdownState.open });
    }
  };

  return (
    <div className={styles.container} ref={container}>
      <button className={!dropdownState.open ? styles.button : styles.buttonOpen} onClick={e => changeDropList(e)}>
        {/* <b>{objects.items ? `Предметы (${objects.items?.length})` : `Преподаватели (${objects.teachers?.length})`}</b> */}
        <b>Параметры</b>
      </button>
      {dropdownState.open && (
        <div>
          {enableSearch && ( <Search/> )}
          <ul>
            {options.map((option) => (
              <li key={option.key}>
                <div>
                  <img alt=""/>
                </div>
                <div>
                  <p>{option.name}</p>
                  <p>{option.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropList;
