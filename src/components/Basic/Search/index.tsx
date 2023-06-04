import Input from "../Input";
import { searchValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
// import api from "helpers/axios";
// import { useAppSelector } from "helpers/redux";
// import { Item } from "types/Item";
// import { Teacher } from "types/Teacher";

interface SearchProps {
  searchBy?: string;
}

const Search: React.FC<SearchProps> = ({ searchBy }) => {
  
  // const institution = useAppSelector(state => state.institution);
  
  // const [itemsSearch, setItemsSearch] = useState<Item[]>([]);
  // const [usersSearch, setUsersSearch] = useState<Teacher[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
    
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    // if(searchBy==="teachers"){
    //   api.get(`/user/all?institution=${institution.id}`).then(res=>{
    //     setUsersSearch(res.data?.users)
    //   })
    // }else{
    //   api.get(`/item/all?institution=${institution.id}`).then(res=>{
    //     setItemsSearch(res.data?.items)
    //   })
    // }

    
  };

  const methods = useForm({ mode: "onBlur" });

  return (
    <FormProvider {...methods}>
      <Input {...searchValidation} label="Поиск" onChange={handleSearch} value={searchTerm} />
    </FormProvider>
  );
};

export default Search;
