import { useAction } from "helpers/redux";
import { FormProvider, useForm } from "react-hook-form";
import { validatePasswordThunk } from "redux/actions/auth.actions";
import { useAppDispatch } from "redux/store";
import { passwordValidation } from "validation";
import { ResolverCallback } from ".";
import DefaultButton from "../Buttons/Default";
import Input from "../Input";

export const PasswordConfirmation: React.FC<{ cb: ResolverCallback }> = ({ cb }) => {
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
