import { Script } from "components/Basic/Scenario";
import api from "helpers/axios";
import { useState } from "react";

const CreateItemScenarioComponent: React.FC = () => {
  const [article, setArticle] = useState<string>("");
  const [name, setName] = useState<string>("");

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
  }
};
