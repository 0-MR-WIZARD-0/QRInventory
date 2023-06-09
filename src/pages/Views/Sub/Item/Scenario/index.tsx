import DefaultButton from "components/Basic/Buttons/Default";
import Input from "components/Basic/Input";
import { ResolverCallback } from "components/Basic/Scenario";
import { useAction } from "helpers/redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validatePasswordThunk } from "redux/actions/auth.actions";
import { deleteItemThunk } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";
import { passwordValidation } from "validation";

export const DeleteItemConfirmation: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
  const methods = useForm<{ password: string }>({ mode: "onBlur" });
  const dispatch = useAppDispatch();
  const { addError } = useAction();

  const onSubmit = methods.handleSubmit(async data => {
    const res = await dispatch(validatePasswordThunk({ password: data.password }));
    if (res.payload === false) addError({ type: "auth", description: "Пароль неверный" });
    return cb(Promise.resolve(res.payload));
  });

  return (
    <FormProvider {...methods}>
      <Input {...passwordValidation} />
      <DefaultButton component={<p>Подтвердить пароль</p>} onSumbit={onSubmit} />
    </FormProvider>
  );
};

export const SuccessConfirmationDeleteItem: React.FC<{ id: string; cb: ResolverCallback }> = ({ id, cb }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addError } = useAction();

  useEffect(() => {
    (async () => {
      const res = await dispatch(deleteItemThunk({ id }));
      cb(Promise.resolve(true));
      if (res.meta.requestStatus === "fulfilled") return navigate(`/${MainViewRoutes.items}`);
      else addError({ type: "user", description: "Произошла ошибка при удалении предмета" });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>Происходит удаление данных</span>;
};
