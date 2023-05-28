import Input from "../Input";
import { searchValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Search: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    onSearchChange(term);
  };

  const methods = useForm({ mode: "onBlur" });

  return (
    <FormProvider {...methods}>
    {/* //   <Input {...searchValidation} label="Поиск" /> */}
    <Input {...searchValidation} label="Поиск" onChange={handleInputChange} value={searchTerm} />

    </FormProvider>
  );
};

export default Search;
