import { Item } from "types/Item";
// import {useState, useEffect} from "react"
import Input from "../Input";
import { searchValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";

// type Props = {
//   items?: Item[];
//   setValue?: any;
// };

// interface Option {
//   value: string;
//   label: string;
// }

// interface DropDownProps {
//   options: Option[];
//   enableSearch?: boolean;
// }

const Search: React.FC = () => {

  const methods = useForm({ mode: "onBlur" });

  // const searchElement = (e:React.ChangeEvent<HTMLInputElement>) => {
  //     const filter = items?.filter(elem => elem.article.toLowerCase().startsWith((e.target as HTMLInputElement).value.toLowerCase()))
  // }
  

  return (
    <FormProvider {...methods}>
      <Input {...searchValidation} label="Поиск"/>
    </FormProvider>
  );
};

export default Search;
