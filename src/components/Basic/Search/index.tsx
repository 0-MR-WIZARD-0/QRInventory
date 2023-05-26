import Input from "../Input";
import { searchValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";



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
