import Select from "react-select";
import styles from "./selector.module.scss";
import { Organization } from "./selector.interface";
import { SelectMessages } from "types/UI";
import { User } from "types/User";
import { Institution } from "types/Institution";
import { useState } from "react";
import { useAppSelector } from "helpers/redux";

type SelectorProps = {
  userData: User;
};

const Selector: React.FC<SelectorProps> = ({ userData }) => {
  const formatInstitutions = (institutions: Institution[]): Organization[] => {
    return institutions.map(i => ({ value: i.id, label: i.name }));
  };

  // позже заменить на стейт
  const [selectedInstitution, setSelectedInstitution] = useState<string | undefined>(undefined);

  console.log(selectedInstitution);

  const institution = useAppSelector(state => state.institution);

  return (
    <>
      <Select
        onChange={e => setSelectedInstitution(e?.value)}
        value={formatInstitutions([institution as Institution])}
        options={formatInstitutions(userData.institutions)}
        noOptionsMessage={() => <div>{SelectMessages.noOptions}</div>}
        isSearchable={true}
        placeholder={SelectMessages.placholder}
        className={styles.select}
        theme={theme => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary25: "lightblue",
            primary: "#082032"
          }
        })}
      />
    </>
  );
};

export default Selector;
