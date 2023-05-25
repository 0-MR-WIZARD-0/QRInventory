import DefaultButton from "components/Basic/Buttons/Default";
import Icon from "components/Basic/Icon";
import Input from "components/Basic/Input";
import { ResolverCallback, Script } from "components/Basic/Scenario";
import styles from "./view.main.items.scenario.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { articleValidation, nameValidation } from "validation";
import { useAppDispatch } from "redux/store";
import { createItemThunk } from "redux/actions/items.actions";
import { useAppSelector } from "helpers/redux";

const CreateItemScenarioComponent: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const methods = useForm<{ article: string; name: string }>({ mode: "onBlur" });
  const dispatch = useAppDispatch();
  const institution = useAppSelector(state => state.institution);

  const onSubmit = methods.handleSubmit(async data => {
    if (!institution.id) return console.log("Учреждение не выбрано");
    const res = await dispatch(createItemThunk({ institutionId: institution.id, article: data.article, name: data.name }));
    if (res.meta.requestStatus === "fulfilled") {
      cb(Promise.resolve(true));
    } else {
      return console.log("Ошибка при создании предмета");
    }
  });

  return (
    <FormProvider {...methods}>
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
        <Input {...articleValidation} />
        <Input {...nameValidation} />
        <DefaultButton component={<>Создать</>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

export const CreateItemScript: Script = {
  0: {
    content: CreateItemScenarioComponent,
    onFailure: -1,
    onSuccess: -1
  }
};
