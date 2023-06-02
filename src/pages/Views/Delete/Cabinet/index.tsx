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
import { passwordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import { setError } from "redux/reducers/error.reducer";

const DeleteCabinetComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const DeleteCabinetModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const CheckPasswordModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const [cabinetInfo, setCabinetInfo] = useState<Cabinet>();

  const methods = useForm<{password: string}>({ mode: "onBlur" });

  useEffect(() => {
    (async () => {
      if (!id) return dispatch(setError('Произошла ошибка: невалидный ID. Обратитесь к администратору!'));
      const res = await dispatch(fetchCabinetThunk({ id }));
      if (res.meta.requestStatus === "fulfilled") return setCabinetInfo(res.payload);
      else {
        dispatch(setError('Произошла ошибка: невалидный ID. Обратитесь к администратору!'));
        return navigate(-1);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteCabinet = async () => {
    if (cabinetInfo && cabinetInfo.id) {
      const res = await dispatch(deleteCabinetThunk({ id: cabinetInfo.id }));
      if (res.meta.requestStatus === "fulfilled") return navigate(`/${MainViewRoutes.cabinets}`)
      else return DeleteCabinetModalRef.current?.createModal()
    }
  };

  const onSubmit = methods.handleSubmit(async data => {
    const res = await dispatch(validatePasswordThunk({ password: data.password }));

    if (res.payload === true) return deleteCabinet();
    else CheckPasswordModalRef.current?.createModal();
  });

  return (
    <FormProvider {...methods}>
      <Scenario ref={DeleteCabinetModalRef} modalName='delete-cabinet-error' script={DeleteCabinetErrorScript} />
      <Scenario ref={CheckPasswordModalRef} modalName='check-password-error' script={CheckPasswordErrorScript} />
      <div className={styles.wrapper}>
        <h3>Удаление кабинета</h3>
        <p>Для продолжения необходимо ввести пароль от аккаунта</p>
        <Input {...passwordValidation} />
        <DefaultButton component={<p>Удалить кабинет</p>} onSumbit={onSubmit} />
      </div>
    </FormProvider>
  );
};

const DeleteCabinet: React.FC = () => {
  return <DeleteCabinetComponent />;
};

export default DeleteCabinet;