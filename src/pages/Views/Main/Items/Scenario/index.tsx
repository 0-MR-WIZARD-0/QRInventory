import Icon from "components/Basic/Icon";
import { Script } from "components/Basic/Scenario"
import api from "helpers/axios";
import { useState } from "react";

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
      <div>
        <h2>Создание предмета</h2>
        <div 
        // className={styles.imageWrapper}
        >
              <Icon icon='image' />
              <input 
              // onChange={changeHandler}
               type='file' accept='.png, .jpg, .jpeg' />
              <h5>Выбрать фотографию предмета</h5>
              <span>макс 5мб</span>
            </div>
        <input placeholder="Артикул" onChange={e=>setArticle(e.target.value)}/>
        <input placeholder="Название предмета" onChange={e=>setName(e.target.value)}/>
        <button onClick={(e)=>{createItem(article, name)}}>Создать</button>
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