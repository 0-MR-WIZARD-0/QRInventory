import Select from "react-select";
import styles from "./selector.module.scss";
import { Organization } from "./selector.interface";
import { SelectMessages } from "types/UI";
import { User } from "types/User";
import { Institution } from "types/Institution";
import { useAction, useAppSelector } from "helpers/redux";

type SelectorProps = {
  userData: User;
};

const Selector: React.FC<SelectorProps> = () => {
  const { data } = useAppSelector(state => state.viewInstitutions);
  const formatInstitutions = (institutions: Institution[]): Organization[] => {
    return institutions.map(i => ({ value: i.id, label: i.name }));
  };

  const { setInstitution } = useAction();
  const institution = useAppSelector(state => state.institution);

  return (
    <Select
      onChange={e => {
        if (e?.value !== institution.id) {
          setInstitution((data ?? []).find(i => i.id === e?.value));
        }
      }}
      value={formatInstitutions([institution as Institution])}
      options={formatInstitutions(data ?? [])}
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
  );
};

export default Selector;
