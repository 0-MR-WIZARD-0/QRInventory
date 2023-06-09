import { ResolverCallback } from "components/Basic/Scenario";
import { useAction } from "helpers/redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserThunk } from "redux/actions/users.actions";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";

export const SuccessConfirmationDeleteUser: React.FC<{ id: string; cb: ResolverCallback }> = ({ id, cb }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addError } = useAction();

  useEffect(() => {
    (async () => {
      const res = await dispatch(deleteUserThunk({ id }));
      cb(Promise.resolve(true));
      if (res.meta.requestStatus === "fulfilled") return navigate(`/${MainViewRoutes.users}`);
      else addError({ type: "user", description: "Произошла ошибка при удалении пользователя" });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>Происходит удаление данных</span>;
};
