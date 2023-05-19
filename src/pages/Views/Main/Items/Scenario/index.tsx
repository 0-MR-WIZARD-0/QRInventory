
import DefaultButton from "components/Basic/Buttons/Default";
import Icon from "components/Basic/Icon";
import Input from "components/Basic/Input";
import { Script } from "components/Basic/Scenario"

import api from "helpers/axios";
import { useState } from "react";
import styles from "./view.main.items.scenario.module.scss"

const CreateItemScenarioComponent: React.FC = () => {
  const [article, setArticle] = useState<string>("");
  const [name, setName] = useState<string>("");

<<<<<<< HEAD
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
=======
  // const createItem = (article: string, name: string) => {
  //   (async () => {
  //     try {
  //       let res = await api.post("/auth/register", {
  //         fullName: article.toString(),
  //         email: name.toString(),
  //       });
  //       if (res.status === 200) {
  //         // createUsers(res.data);
  //         console.log(res.data);
  //       } else {
  //         console.log(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }

  return (
    <div>
      <h2>Создание предмета</h2>
      <input placeholder='Артикул' onChange={e => setArticle(e.target.value)} />
      <input placeholder='Название предмета' onChange={e => setName(e.target.value)} />
      {/* <button onClick={(e)=>{createItem(article, name)}}>Создать</button> */}
    </div>
  );
};

export const CreateItemScript: Script = {
  0: {
    content: CreateItemScenarioComponent,
    onFailure: -1,
    onSuccess: -1
>>>>>>> bd7869fa74d409cb583b36deeb69c47cfdadc9ba
  }

};


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

