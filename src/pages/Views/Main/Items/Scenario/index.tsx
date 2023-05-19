import DefaultButton from "components/Basic/Buttons/Default";
import Icon from "components/Basic/Icon";
import Input from "components/Basic/Input";
import { Script } from "components/Basic/Scenario"
import api from "helpers/axios";
import { useState } from "react";
import styles from "./view.main.items.scenario.module.scss"

const CreateItemScenarioComponent: React.FC = () => {

  const [article, setArticle] = useState<string>("");
  const [name, setName] = useState<string>("")

  const createItem = (article: string, name: string) => {
    (async () => {
      try {
        let res = await api.post("/item/create", {
          article: article,
          name: name
        });
        if (res.status === 200) {
          // createItem()
          console.log(res.data);
          
          console.log(res.data);
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }

    return (
      <div className={styles.createItem}>
        <h2>Создание предмета</h2>
        <div className={styles.imageWrapper}
        >
            <label>
              <Icon icon='image' />
              <input 
              // onChange={changeHandler}
               type='file' accept='.png, .jpg, .jpeg' />
              <h5>Выбрать фотографию предмета</h5>
              <span>макс 5мб</span>
            </label>
        </div>
        <Input name='article' value={""} onChange={()=>{}} placeholder={"I-504-DS"} label='артикул' />
        <Input name='name' value={""} onChange={()=>{}} placeholder={"стул обыкновенный"} label='название' />
        <DefaultButton component={<>Создать</>} onSumbit={() => {}} />
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