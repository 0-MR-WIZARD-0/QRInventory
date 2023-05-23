import DefaultButton from "components/Basic/Buttons/Default";
import styles from "./view.delete.item.module.scss"
import Input from "components/Basic/Input";

const DeleteItemComponent:React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h3>Удаление предмета {""}</h3>
            <p>Для продолжения необходимо ввести пароль от аккаунта</p>
            {/* <Input name='password' onChange={() => {}} value={""} label='пароль' type="password" /> */}
            <DefaultButton component={<p>Удалить предмет</p>} onSumbit={()=>{}}/>
        </div>
    )
}

const DeleteItem:React.FC = () => {
  return <DeleteItemComponent/>
}

export default DeleteItem