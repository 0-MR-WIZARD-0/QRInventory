import Select from "react-select";
import styles from "./selector.module.scss";
import { Organization } from "./selector.interface";
import { SelectMessages } from "types/UI";
import { Institution } from "types/Institution";
import { useAction, useAppSelector } from "helpers/redux";

const Selector: React.FC = () => {
  const { userData } = useAppSelector(state => state.user);
  const formatInstitutions = (institutions: Institution[]): Organization[] => {
    return institutions.map(i => ({ value: i.id, label: i.name }));
  };

  const { setInstitution } = useAction();
  const institution = useAppSelector(state => state.institution);

  if (!userData) return <></>;

  return (
    <Select
      onChange={e => {
        if (e?.value !== institution.id) {
          setInstitution(userData.institutions.find(i => i.id === e?.value));
        }
      }}
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
  );
};

export default Selector;
