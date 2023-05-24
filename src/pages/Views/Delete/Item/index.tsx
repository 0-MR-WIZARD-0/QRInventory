import DefaultButton from "components/Basic/Buttons/Default";
import styles from "./view.delete.item.module.scss";
import Input from "components/Basic/Input";
import { passwordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";

const DeleteItemComponent: React.FC = () => {
  const methods = useForm({ mode: "onBlur" });

  const onSubmit = methods.handleSubmit(async data => {});

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <h3>Удаление предмета</h3>
        <p>Для продолжения необходимо ввести пароль от аккаунта</p>
        <Input {...passwordValidation} />
        <DefaultButton component={<p>Удалить предмет</p>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

const DeleteItem: React.FC = () => {
  return <DeleteItemComponent />;
};

export default DeleteItem;
