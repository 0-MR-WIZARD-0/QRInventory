import React, { useState, useEffect, useRef } from "react";
import styles from "./droplist.module.scss";
import { Item } from "types/Item";
import api from "helpers/axios";
import { useParams } from "react-router-dom";

type Props = {
  items: Item[];
  cabinetId: string;
};

const DropList: React.FC<Props> = ({ items, cabinetId }) => {
  const { id } = useParams();

  const container = useRef<HTMLInputElement>(null);

  const [dropdownState, setDropdownState] = useState({ open: false });
  const [objects, setObjects] = useState(items);

  const changeDropList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (container.current && !container.current.contains(e.target as HTMLButtonElement)) {
      setDropdownState({ open: false });
    } else {
      setDropdownState({ open: !dropdownState.open });
    }
  };

  useEffect(() => {
    console.log(objects);
  }, []);

  const removel = (data: any) => {
    api
      .patch("/cabinet/edit", {
        id: cabinetId,
        cabinetNumber: id,
        items: ["b0363b16-464d-45a2-9dda-4564f03283b6"] //массив строк (измененный)
      })
      .then(res => {
        console.log(res.data);
        setObjects(res.data);
      });
  };

  return (
    <div className={styles.container} ref={container}>
      <button className={styles.button} onClick={e => changeDropList(e)}>
        Предметы
      </button>
      {dropdownState.open && (
        <div>
          <ul>
            {!objects.length ? (
              <li>Предметы отсутствуют</li>
            ) : (
              objects?.map(elem => (
                <li key={elem.id}>
                  <div>
                    <img alt='' />
                  </div>
                  <div>
                    <p>{elem.name}</p>
                    <p>{elem.article}</p>
                    <button onClick={() => removel(elem)}>Удалить</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropList;
