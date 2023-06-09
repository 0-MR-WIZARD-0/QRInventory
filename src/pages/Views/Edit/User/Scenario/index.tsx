import { ResolverCallback } from "components/Basic/Scenario";
import { useImage } from "helpers/hooks";
import { useAction, useAppSelector } from "helpers/redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { imageUserThunk } from "redux/actions/image.actions";
import { RejectResponsesInstitution } from "redux/actions/institutions.actions";
import { editUserThunk, RejectResponsesUser } from "redux/actions/users.actions";
import { useAppDispatch } from "redux/store";
import { EditUserData } from "..";

export const SuccesConfirmationEditUser: React.FC<{
  imageMethods: ReturnType<typeof useImage>;
  id: string;
  data: EditUserData;
  cb: ResolverCallback;
}> = ({ data, id, imageMethods, cb }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const dispatch = useAppDispatch();
  const institution = useAppSelector(state => state.institution);
  const { userData } = useAppSelector(state => state.user);
  const { addError, fetchUserThunk, searchUserThunk } = useAction();

  useEffect(() => {
    (async () => {
      if (imageMethods.file !== undefined) {
        let res = await dispatch(imageUserThunk({ id, file: imageMethods.file }));
        if (res.meta.requestStatus === "rejected") {
          return addError({
            type: "user",
            description: RejectResponsesUser.editUserError + ". Произошла ошибка при загрузке фото."
          });
        }
      }
      const res = await dispatch(editUserThunk({ id, fullName: data.fullName, email: data.email }));
      if (res.meta.requestStatus === "fulfilled") {
        if (id === userData!.id) {
          await fetchUserThunk({ initial: false });
        } else {
          if (!institution.id) {
            return addError({
              type: "institution",
              description: RejectResponsesInstitution.notFound
            });
          }
          await searchUserThunk({ id, institution: institution.id, take: 1, skip: 0, searchVal: "" });
        }
        cb(Promise.resolve(true));
        return navigate(location.slice(0, location.length - 1).join("/"));
      } else return addError({ type: "user", description: RejectResponsesUser.editUserError });
    })();
  });

  return <span>Происходит обновление данных</span>;
};
