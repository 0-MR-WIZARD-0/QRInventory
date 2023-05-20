import { Item } from "types/Item";
import {useState, useEffect} from "react"
import Input from "../Input";

type Props = {
    items?: Item[],
    setValue?: any
}

const Search:React.FC<Props> = ({items, setValue}) => {

    const searchElement = (e:React.ChangeEvent<HTMLInputElement>) => {
        const filter = items?.filter(elem => elem.article.toLowerCase().startsWith((e.target as HTMLInputElement).value.toLowerCase()))
    }

  return (
    // <div>
        <Input name='password' onChange={() => {}} value={""} label='Артикул'/>
        // {/* <input onChange={searchElement} ></input> */}
    // </div>
  )
}

export default Search