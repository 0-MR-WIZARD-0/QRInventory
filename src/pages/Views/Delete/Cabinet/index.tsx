import BackButton from "components/Basic/Buttons/Back"
import { Scenario } from "components/Basic/Scenario"
import api from "helpers/axios"
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Cabinet } from "types/Cabinet"
import { CheckPasswordErrorScript, DeleteCabinetErrorScript } from "./Scenario"

const DeleteCabinet:React.FC = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const DeleteCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
    const CheckPasswordModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

    const [cabinetInfo, setCabinetInfo] = useState<Cabinet>()

    useEffect(()=>{
        api.get("/cabinet", {params: {cabinet: id}}).then((res)=>{
            setCabinetInfo(res.data)
        })
    },[])

    const [password, setPassword] = useState<string>("")
    
    const deleteCabinetId = () => {
        api.delete(`/cabinet/${cabinetInfo?.id}`)
            .then(()=>{navigate("/cabinets")})
            .catch(()=>{DeleteCabinetModalRef.current?.createModal()}
        )
    }
    
    const checkPassword = (password: string) => {
        api.post("/auth/validate-password", {inputPassword: password}).then((res)=>{
            if(res.data === true){
                deleteCabinetId()
            }else{
                CheckPasswordModalRef.current?.createModal();
            }
        }
        )
    }


  return (
    <>
        <Scenario ref={DeleteCabinetModalRef} modalName='delete-cabinet-error' script={DeleteCabinetErrorScript} />
        <Scenario ref={CheckPasswordModalRef} modalName='check-password-error' script={CheckPasswordErrorScript} />
        <BackButton/>
        <div>
            <h3>Удаление кабинета {id}</h3>
            <p>Для продолжения необходимо ввести пароль от аккаунта</p>
            <input type="password" placeholder="Введите пароль" onChange={e=>setPassword(e.target.value)}/>
            <button onClick={()=>checkPassword(password)}>Продолжить</button>
        </div>
    </>
  )
}

export default DeleteCabinet