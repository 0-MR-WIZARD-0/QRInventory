import Select from "react-select";
import styles from "./selector.module.scss";
import { Organization } from "./selector.interface";

const organizationsOption: Organization[] = [
  { value: ".", label: "Колледж бизнес-технологий" },
  { value: "..", label: "Колледж бизнес-технологий" },
  { value: "...", label: "Колледж бизнес-технологий" },
  { value: "....", label: "Колледж бизнес-технологий" }
];

const Selector = () => {
  return (
    <Select
      options={organizationsOption}
      isSearchable={true}
      placeholder='Выберите учреждение'
      className={styles.select}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
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
