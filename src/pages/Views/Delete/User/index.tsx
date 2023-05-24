import DefaultButton from "components/Basic/Buttons/Default";
import styles from "./view.delete.user.module.scss";
import Input from "components/Basic/Input";
import { passwordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";

const DeleteUserComponent: React.FC = () => {
  const methods = useForm({ mode: "onBlur" });

  const onSubmit = methods.handleSubmit(async data => {});

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <h3>Удаление пользователя {""}</h3>
        <p>Для продолжения необходимо ввести пароль от аккаунта</p>
        <Input {...passwordValidation} />
        <DefaultButton component={<p>Удалить пользователя</p>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

const DeleteUser: React.FC = () => {
  return <DeleteUserComponent />;
};

export default DeleteUser;
