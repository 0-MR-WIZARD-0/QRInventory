import { ResolverCallback } from "components/Basic/Scenario";
import { useAction } from "helpers/redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editCabinetThunk } from "redux/actions/cabinets.actions";
import { useAppDispatch } from "redux/store";
import { MainViewRoutes } from "types/Routes";
import { EditCabinetData } from "..";

export const SuccesConfirmationEditCabinet: React.FC<{
  id: string;
  data: Pick<EditCabinetData, "cabinetNumber">;
  dropDownState: Omit<EditCabinetData, "cabinetNumber">;
  cb: ResolverCallback;
}> = ({ data, dropDownState, id, cb }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const { addError } = useAction();

  useEffect(() => {
    (async () => {
      let res = await dispatch(
        editCabinetThunk({
          id,
          cabinetNumber: data.cabinetNumber,
          items: dropDownState.item.map(i => i.id),
          teachers: dropDownState.user.map(u => u.id)
        })
      );

      cb(Promise.resolve(true));
      if (res.meta.requestStatus !== "fulfilled") {
        return addError({
          type: "cabinet",
          description: "Произошла ошибка при изменении кабинета"
        });
      }
      return navigate(location.slice(0, location.length - 1).join("/"));
    })();
  });

  return <span>Происходит обновление данных</span>;
};
