import React, { useState, useRef, useEffect } from "react";
import styles from "./droplist.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { searchValidation } from "validation";
import Input from "components/Basic/Input";
import classNames from "classnames";

interface DropDownProps {
  options: React.ReactNode[];
  name: React.ReactNode;
  inputName: string;
  enableEdit?: boolean;
  observerRef?: React.RefObject<HTMLDivElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const DropList: React.FC<DropDownProps> = ({ options, enableEdit = false, onChange, name, inputName }) => {
  const container = useRef<HTMLInputElement>(null);
  const [dropdownState, setDropdownState] = useState({ open: false });
  const changeDropListState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (container.current && !container.current.contains(e.target as HTMLButtonElement)) {
      setDropdownState({ open: false });
    } else {
      setDropdownState({ open: !dropdownState.open });
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onChange !== undefined) onChange(event);
    else if (enableEdit && onChange === undefined) console.log("Метод поиска не реализован!");
  };

  useEffect(() => {
    if (dropdownState.open) {
      handleSearch({ target: { value: methods.getValues(inputName), name: inputName } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }, [dropdownState.open]);
  const methods = useForm({ mode: "onBlur" });

  return (
    <div className={classNames(styles.container, enableEdit && dropdownState.open && styles.containerOpen)} ref={container}>
      <button className={classNames(styles.button, dropdownState.open && styles.buttonOpen)} onClick={changeDropListState}>
        <>{name ?? "Список"}</>
      </button>
      {dropdownState.open && (
        <div>
          {enableEdit && (
            <FormProvider {...methods}>
              <Input {...searchValidation} name={inputName} label='Поиск' onChange={handleSearch} value={searchTerm} />
            </FormProvider>
          )}
          <ul>
            {options.length ? (
              options
            ) : (
              <span style={{ display: "flex", justifyContent: "center", height: "160px", alignItems: "center" }}>{} отсутствуют</span>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropList;
