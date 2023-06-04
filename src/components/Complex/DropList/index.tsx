import React, { useState, useRef } from "react";
import styles from "./droplist.module.scss";
import Search from "components/Basic/Search";

interface Option {
  key: string;
  name: string;
  value: string;
}

interface DropDownProps {
  options: Option[];
  enableSearch?: boolean;
  enableEdit?: boolean;
  searchBy?: string
}

const DropList: React.FC<DropDownProps> = ({ options, enableSearch = false, enableEdit = false, searchBy}) => {
  
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
          {enableSearch && ( <Search searchBy={searchBy}/> )}
          <ul>
            {options.length ? 
              (options.map((option) => (
                <li key={option.key}>
                  <div>
                    <img alt=""/>
                  </div>
                  <div>
                    <div>
                      <p>{option.name}</p>
                      <p>{option.value}</p>
                    </div>
                    {/* {enableEdit && (
                    <div>
                      <button>Добавить</button>
                      <button>удалить</button>
                    </div>
                  )} */}
                  </div>
                </li>
              ))) : <span style={{display: 'flex', justifyContent: 'center', height: '160px', alignItems: "center"}}>{} отсутствуют</span>
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropList;
