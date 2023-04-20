import Select from "react-select"
import { Organization } from "./selector.interface";
import styles from "./selector.module.scss";


const organizationsOption: Organization[] = [
    { value: '.', label: 'Колледж бизнес-технологий'},
    { value: '..', label: 'Колледж бизнес-технологий'},
    { value: '...', label: 'Колледж бизнес-технологий'},
    { value: '....', label: 'Колледж бизнес-технологий'}
];

const Selector = () => {
  return (
    <Select options={organizationsOption} isSearchable={true} placeholder="Выберите учреждение" className={styles.select}/>
  )
}

export default Selector