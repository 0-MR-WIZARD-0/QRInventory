import DefaultButton from "components/Basic/Buttons/Default";
import Icon from "components/Basic/Icon";
import Input from "components/Basic/Input";
import { ResolverCallback, Script } from "components/Basic/Scenario";
import api from "helpers/axios";
import { useAppSelector } from "helpers/redux";
import { useState } from "react";
import { createItemThunk } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import styles from "./view.main.items.scenario.module.scss";

const CreateItemScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const institution = useAppSelector(state => state.institution);
  const dispatch = useAppDispatch();
  const [article, setArticle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onSubmit = async () => {
    if (!institution.id) return console.log("Ошибка, не выбрано учреждение");
    const res = await dispatch(createItemThunk({ institutionId: institution.id, article, name }));
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } else {
      return console.log("Ошибка при создании предмета");
    }
  };

  return (
    <div className={styles.createItem}>
      <h2>Создание предмета</h2>
      <div className={styles.imageWrapper}>
        <label>
          <Icon icon='image' />
          <input
            // onChange={changeHandler}
            type='file'
            accept='.png, .jpg, .jpeg'
          />
          <h5>Выбрать фотографию предмета</h5>
          <span>макс 5мб</span>
        </label>
      </div>
      <Input name='article' value={article} onChange={e => setArticle(e.target.value)} placeholder={"I-504-DS"} label='артикул' />
      <Input name='name' value={name} onChange={e => setName(e.target.value)} placeholder={"стул обыкновенный"} label='название' />
      <DefaultButton component={<>Создать</>} onSumbit={onSubmit} />
    </div>
  );
};

export const CreateItemScript: Script = {
  0: {
    content: CreateItemScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
