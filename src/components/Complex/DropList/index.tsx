import React, { useState, useRef } from "react";
import styles from "./droplist.module.scss";
import { Item } from "types/Item";
import Search from "components/Basic/Search";

import { Teacher } from "types/Teacher";

type Props = {
  items?: Item[];
  teachers?: Teacher[];
  cabinetId?: string;
};

const DropList: React.FC<Props> = ({ items, teachers }) => {
  const container = useRef<HTMLInputElement>(null);

  const [dropdownState, setDropdownState] = useState({ open: false });
  const [objects, setObjects] = useState({
    items: items,
    teachers: teachers
  });

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
        <b>{objects.items ? `Предметы (${objects.items?.length})` : `Преподаватели (${objects.teachers?.length})`}</b>
      </button>
      {dropdownState.open && (
        <div>
          <Search items={items} setValue={setObjects} />
          <ul>
            {objects.items?.length || objects.teachers?.length ? (
              objects.items?.map(i => (
                <li key={i.id}>
                  <div>
                    <img src={`/image/${i.imageId}`} alt={i.article} />
                  </div>
                  <div>
                    <p>{i.name}</p>
                    <p>{i.article}</p>
                  </div>
                </li>
              )) ||
              objects.teachers?.map(t => (
                <li key={t.id}>
                  <div>
                    <img src={`/image/${t.avatarId}`} alt={t.fullName} />
                  </div>
                  <div>
                    <p>{t.fullName}</p>
                    <p>{t.email}</p>
                  </div>
                </li>
              ))
            ) : (
              <>Элементы отсутствуют</>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropList;
