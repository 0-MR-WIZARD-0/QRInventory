import { ResolverCallback } from "components/Basic/Scenario";
import { useImage } from "helpers/hooks";
import { useAction, useAppSelector } from "helpers/redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { imageItemThunk } from "redux/actions/image.actions";
import { RejectResponsesInstitution } from "redux/actions/institutions.actions";
import { editItemThunk, RejectResponsesItem } from "redux/actions/items.actions";
import { useAppDispatch } from "redux/store";
import { EditItemData } from "..";

export const SuccesConfirmationEditItem: React.FC<{
  imageMethods: ReturnType<typeof useImage>;
  id: string;
  data: EditItemData;
  cb: ResolverCallback;
}> = ({ data, id, imageMethods, cb }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const institution = useAppSelector(state => state.institution);
  const { addError, searchItemThunk } = useAction();

  useEffect(() => {
    (async () => {
      if (imageMethods.file !== undefined) {
        let res = await dispatch(imageItemThunk({ id, file: imageMethods.file }));
        if (res.meta.requestStatus === "rejected") {
          return addError({
            type: "item",
            description: RejectResponsesItem.editItemError + ". Произошла ошибка при загрузке фото."
          });
        }
      }

      cb(Promise.resolve(true));
      if (data.article.length && data.name.length !== 0) {
        const res = await dispatch(editItemThunk({ id, ...data }));
        if (res.meta.requestStatus === "fulfilled") {
          if (!institution.id) {
            return addError({
              type: "institution",
              description: RejectResponsesInstitution.notFound
            });
          }

          await searchItemThunk({ institution: institution.id, take: 1, skip: 0, id });
          return navigate(location.slice(0, location.length - 1).join("/"));
        }
      } else return addError({ type: "item", description: RejectResponsesItem.editItemError });
    })();
  });

  return <span>Происходит обновление данных</span>;
};
