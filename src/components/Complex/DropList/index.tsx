import React, { useState, useRef } from "react";
import styles from "./droplist.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { searchValidation } from "validation";
import Input from "components/Basic/Input";
import classNames from "classnames";

interface Option {
  key: string;
  name: string;
  value: string;
}

interface DropDownProps {
  options: Option[];
  name: React.ReactNode;
  inputName: string;
  enableSearch?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const DropList: React.FC<DropDownProps> = ({ options, enableSearch = false, onChange, name, inputName }) => {
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
    else if (enableSearch && onChange === undefined) console.log("Метод поиска не реализован!");
  };
  const methods = useForm({ mode: "onBlur" });

  return (
    <div className={classNames(styles.container, enableSearch && dropdownState.open && styles.containerOpen)} ref={container}>
      <button className={classNames(styles.button, dropdownState.open && styles.buttonOpen)} onClick={changeDropListState}>
        {/* <b>{objects.items ? `Предметы (${objects.items?.length})` : `Преподаватели (${objects.teachers?.length})`}</b> */}
        <>{name ?? "Список"}</>
      </button>
      {dropdownState.open && (
        <div>
          {enableSearch && (
            <FormProvider {...methods}>
              <Input {...searchValidation} name={inputName} label='Поиск' onChange={handleSearch} value={searchTerm} />
            </FormProvider>
          )}
          <ul>
            {options.length ? (
              options.map(option => (
                <li key={option.key}>
                  {/* тут потом будет кастомный метод рендера элементов */}
                  <div>
                    <img alt='' />
                  </div>
                  <div>
                    <div>
                      <p>{option.name}</p>
                      <p>{option.value}</p>
                    </div>
                  </div>
                  {/*  */}
                </li>
              ))
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
