import { combineReducers } from "@reduxjs/toolkit";
import institutionReducer, { institutionActions } from "./reducers/institution.reducer";
import { fetchUserThunk, loginUserThunk, logoutUserThunk } from "./actions/auth.actions";
import { fetchCabinetsThunk, fetchInstitutionsThunk, fetchItemsThunk, fetchUsersThunk } from "./actions/views.main.actions";
import viewUsersReducer, { viewUsersActions } from "./reducers/view.users.reducer";
import viewCabinetsReducer, { viewCabinetsActions } from "./reducers/view.cabinets.reducer";
import viewItemsReducer, { viewItemsActions } from "./reducers/view.items.reducer";
import userReducer, { userActions } from "./reducers/user.reducer";
import viewInstitutionsReducer, { viewInstitutionsActions } from "./reducers/view.institutions.reducer";
import errorsReducer, { errorActions } from "./reducers/errors.reducer";
import imageReducer from "./reducers/image.reducer";
import { searchUserThunk } from "./actions/users.actions";

export const rootReducer = combineReducers({
  user: userReducer,
  institution: institutionReducer,
  errors: errorsReducer,
  image: imageReducer,

  viewUsers: viewUsersReducer,
  viewCabinets: viewCabinetsReducer,
  viewItems: viewItemsReducer,
  viewInstitutions: viewInstitutionsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const ActionCreators = {
  ...userActions,
  ...institutionActions,

  ...viewUsersActions,
  ...viewCabinetsActions,
  ...viewItemsActions,
  ...viewInstitutionsActions,

  ...errorActions,

  fetchUserThunk,
  loginUserThunk,
  logoutUserThunk,

  fetchUsersThunk,
  fetchItemsThunk,
  fetchCabinetsThunk,
  fetchInstitutionsThunk,

  searchUserThunk
};
