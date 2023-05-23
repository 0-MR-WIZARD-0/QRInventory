import DefaultButton from "components/Basic/Buttons/Default"
import styles from "./view.delete.user.module.scss"
import Input from "components/Basic/Input"

const DeleteUserComponent:React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h3>Удаление пользователя {""}</h3>
            <p>Для продолжения необходимо ввести пароль от аккаунта</p>
            {/* <Input name='password' onChange={() => {}} value={""} label='пароль' type="password" /> */}
            <DefaultButton component={<p>Удалить пользователя</p>} onSumbit={()=>{}}/>
        </div>
    )
}

const DeleteUser: React.FC = () => {
  return <DeleteUserComponent/>
}

export default DeleteUser