import React, { useState, useEffect, useRef } from "react";
import styles from "./droplist.module.scss";
import { Item } from "types/Item";
import api from "helpers/axios";
import { useParams } from "react-router-dom";
import Search from "components/Basic/Search";

import { Teacher } from "types/Teacher";


type Props = {
  items?: Item[];
  teachers?: Teacher[];
  cabinetId?: string;
};

const DropList: React.FC<Props> = ({ items, cabinetId, teachers}) => {
  const { id } = useParams();

  const container = useRef<HTMLInputElement>(null);

  
    const [dropdownState, setDropdownState] = useState({ open: false });
    const [objects, setObjects] = useState({
        items: items,
        teachers: teachers
    })


  const changeDropList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (container.current && !container.current.contains(e.target as HTMLButtonElement)) {
      setDropdownState({ open: false });
    } else {
      setDropdownState({ open: !dropdownState.open });
    }
  };

  const removel = (elem: any, objects: Item[]) => {
    let modifiedArray: string[] = [];

    objects.filter(objects => objects.id !== elem).map(elem => modifiedArray.push(elem.id));

    api
      .patch("/cabinet/edit", {
        id: cabinetId,
        cabinetNumber: id,
        items: modifiedArray
      })
      .then(res => {
        console.log(res.data);
        setObjects(res.data);
      });
  };

  return (
    <div className={styles.container} ref={container}>

        <button 
            className={!dropdownState.open ? styles.button : styles.button_open}
            onClick={(e)=>changeDropList(e)}
        >
          <b>
            {objects.items ? `Предметы (${objects.items?.length})` : `Преподаватели (${objects.teachers?.length})`}
          </b>
        </button>
        {dropdownState.open && ( 
            <div>
            {/* <Search items={items} setValue={setObjects}/> */}
            <ul>

                {objects.items?.length || objects.teachers?.length ?

                  objects.items?.map(elem=>(
                    <li key={elem.id}>
                        <div>
                            <img alt=""/>
                        </div>
                        <div>
                            <p>{elem.name}</p>
                            <p>{elem.article}</p>
                        </div>
                    </li>
                )) || objects.teachers?.map(elem=>(
                  <li key={elem.id}>
                      <div>
                          <img alt=""/>
                      </div>
                      <div>
                          <p>{elem.fullName}</p>
                          <p>{elem.email}</p>
                      </div>
                  </li>
              )) 

              :
                  <>Элементы отсутствуют</>
                }
            </ul>

        </div>
      )}
    </div>
  );
};

export default DropList;
