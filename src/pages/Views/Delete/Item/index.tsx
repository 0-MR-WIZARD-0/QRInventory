import DefaultButton from "components/Basic/Buttons/Default";
import styles from "./view.delete.item.module.scss";
import Input from "components/Basic/Input";
import { passwordValidation } from "validation";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "redux/store";
import { useEffect, useRef, useState } from "react";
import { Scenario } from "components/Basic/Scenario";
import { Item } from "types/Item";
import { deleteItemThunk, fetchItemThunk } from "redux/actions/items.actions";
import { MainViewRoutes } from "types/Routes";
import { validatePasswordThunk } from "redux/actions/auth.actions";
import { CheckPasswordErrorScript, DeleteItemErrorScript } from "./Scenario";
import { useAction } from "helpers/redux";
import { DefaultErrors } from "redux/reducers/errors.reducer";

const DeleteItemComponent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addError } = useAction();

  const DeleteItemModalRef = useRef<React.ElementRef<typeof Scenario>>(null);
  const CheckPasswordModalRef = useRef<React.ElementRef<typeof Scenario>>(null);

  const [itemInfo, setItemInfo] = useState<Item>();

  const methods = useForm<{ password: string }>({ mode: "onBlur" });

  useEffect(() => {
    (async () => {
      if (!id) return addError({ type: "item", description: DefaultErrors.invalidId });
      const res = await dispatch(fetchItemThunk({ id }));
      if (res.meta.requestStatus === "fulfilled") return setItemInfo(res.payload as Item);
      else {
        addError({ type: "item", description: DefaultErrors.invalidId });
        return navigate(-1);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteUser = async () => {
    if (itemInfo && itemInfo.id) {
      const res = await dispatch(deleteItemThunk({ id: itemInfo.id }));
      if (res.meta.requestStatus === "fulfilled") return navigate(`/${MainViewRoutes.items}`);
      else return DeleteItemModalRef.current?.createModal();
    }
  };

  const onSubmit = methods.handleSubmit(async data => {
    const res = await dispatch(validatePasswordThunk({ password: data.password }));

    if (res.payload === true) return deleteUser();
    else CheckPasswordModalRef.current?.createModal();
  });

  return (
    <FormProvider {...methods}>
      <Scenario ref={DeleteItemModalRef} modalName='delete-item-error' script={DeleteItemErrorScript} />
      <Scenario ref={CheckPasswordModalRef} modalName='check-password-error' script={CheckPasswordErrorScript} />
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
