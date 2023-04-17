import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  let navigate = useNavigate()

  return (
    <main>
      <div>
        <div>
          <div>
            <img alt=""/>
          </div>
          <div>
            <h3>Администратор</h3>
            <p>Зуннунов Борис</p>
            <p>Сергеевич</p>
            <p>test@mail.com</p>
          </div>
          
        </div>
        <div>
          <p>Управление аккаунтом</p>
          <div>
            <button>Редактирование</button>
            <button onClick={()=>{navigate("/")}}>Вернуться на главную</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile