import React, {useState, useRef} from 'react'
import styles from "./droplist.module.scss"
import { Item } from 'types/Item';
import api from 'helpers/axios';
import { useParams } from 'react-router-dom';
import Search from '../../Basic/Search';

type Props = {
    items: Item[]
    cabinetId: string
}

const DropList:React.FC<Props> = ({items, cabinetId}) => {

    const { id } = useParams();
    
    const container = useRef<HTMLDivElement>(null)

    const [dropdownState, setDropdownState] = useState({ open: false });
    const [objects, setObjects] = useState<Item[]>(items)

    const changeDropList = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (container.current && !container.current.contains(e.target as HTMLButtonElement)) {
            setDropdownState({ open: false });
        } else { 
            setDropdownState({ open: !dropdownState.open });
            
        }
    }
    
    const removel = (elem: any, objects: Item[]) => {
        let modifiedArray:string[] = []
        
        objects.filter(objects => objects.id !== elem).map((elem)=> modifiedArray.push(elem.id));

        api.patch("/cabinet/edit", {
            id: cabinetId,
            cabinetNumber: id,
            items: modifiedArray
        }).then((res)=>{
            setObjects(res.data.items)
        })
    }
    
    return (
        <div className={styles.container} ref={container}>
        <button 
            className={dropdownState.open ? styles.button_open : styles.button}
            onClick={(e)=>changeDropList(e)}
        >
            Предметы
        </button>
        {dropdownState.open && ( 
        <div>
            <Search 
            items={objects} setValue={setObjects}
            />
            <ul>
                {!objects.length ? <li>Предметы отсутствуют</li> : objects?.map(elem=>(
                    <li key={elem.id}>
                        <div>
                            <img alt=""/>
                        </div>
                        <div>
                            <p>{elem.id}</p>
                            <p>{elem.name}</p>
                            <p>{elem.article}</p>
                            <button onClick={()=>removel(elem.id, objects)}>Удалить</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        )}
    </div>
 );
}

export default DropList