import Input from "../Input";
import { searchValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";

interface SearchProps {
  items: any[];
  onSearch: (filteredItems: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ items, onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filtered);
  }, [items, searchTerm, onSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const methods = useForm({ mode: "onBlur" });

  return (
    <FormProvider {...methods}>
      <Input {...searchValidation} label="Поиск" onChange={handleSearch} value={searchTerm} />
    </FormProvider>
  );
};

export default Search;
