import { Scenario } from "components/Basic/Scenario";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cabinet } from "types/Cabinet";
import { CheckPasswordErrorScript, DeleteCabinetErrorScript } from "./Scenario";
import DefaultButton from "components/Basic/Buttons/Default";
import styles from "./view.delete.cabinet.module.scss";
import Input from "components/Basic/Input";
import { useAppDispatch } from "redux/store";
import { deleteCabinetThunk, fetchCabinetThunk } from "redux/actions/cabinets.actions";
import { validatePasswordThunk } from "redux/actions/auth.actions";
import { MainViewRoutes } from "types/Routes";

const DeleteCabinetComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const DeleteCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const CheckPasswordModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const [cabinetInfo, setCabinetInfo] = useState<Cabinet>();

  useEffect(() => {
    (async () => {
      if (!id) return console.log("Отсутствует id");
      const res = await dispatch(fetchCabinetThunk({ id }));
      if (res.meta.requestStatus === "fulfilled") return setCabinetInfo(res.payload);
      else {
        return () => {
          console.log(res.payload);
          return navigate(-1);
        };
      }
    })();
  }, [id]);

  const [password, setPassword] = useState<string>("");

  const deleteCabinet = async () => {
    if (cabinetInfo && cabinetInfo.id) {
      const res = await dispatch(deleteCabinetThunk({ id: cabinetInfo.id }));
      if (res.meta.requestStatus === "fulfilled") {
        return navigate(`/${MainViewRoutes.cabinets}`);
      } else {
        return () => {
          console.log(res.payload);
          return DeleteCabinetModalRef.current?.createModal();
        };
      }
    }
  };

  const checkPassword = async () => {
    const res = await dispatch(validatePasswordThunk({ password }));

    if (res.meta.requestStatus === "fulfilled") return deleteCabinet();
    else {
      return () => {
        console.log(res.payload);
        CheckPasswordModalRef.current?.createModal();
      };
    }
  };

  return (
    <>
      <Scenario ref={DeleteCabinetModalRef} modalName='delete-cabinet-error' script={DeleteCabinetErrorScript} />
      <Scenario ref={CheckPasswordModalRef} modalName='check-password-error' script={CheckPasswordErrorScript} />
      <div className={styles.wrapper}>
        <h3>Удаление кабинета {id}</h3>
        <p>Для продолжения необходимо ввести пароль от аккаунта</p>
        <Input name='password' onChange={e => setPassword(e.target.value)} value={password} label='пароль' type='password' />
        <DefaultButton component={<p>Удалить кабинет</p>} onSumbit={checkPassword} />
      </div>
    </>
  );
};

const DeleteCabinet: React.FC = () => {
  return <DeleteCabinetComponent />;
};

export default DeleteCabinet;
