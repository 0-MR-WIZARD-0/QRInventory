import { combineReducers } from "@reduxjs/toolkit";
import institutionReducer, { institutionActions } from "./reducers/institution.reducer";
import { fetchUserThunk, loginUserThunk, logoutUserThunk } from "./actions/auth.actions";
import { fetchCabinetsThunk, fetchItemsThunk, fetchUsersThunk } from "./actions/views.main.actions";
import viewUsersReducer, { viewUsersActions } from "./reducers/view.users.reducer";
import viewCabinetsReducer, { viewCabinetsActions } from "./reducers/view.cabinets.reducer";
import viewItemsReducer, { viewItemsActions } from "./reducers/view.items.reducer";
import userReducer, { userActions } from "./reducers/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  institution: institutionReducer,

  viewUsers: viewUsersReducer,
  viewCabinets: viewCabinetsReducer,
  viewItems: viewItemsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const ActionCreators = {
  ...userActions,
  ...institutionActions,

  ...viewUsersActions,
  ...viewCabinetsActions,
  ...viewItemsActions,

  fetchUserThunk,
  loginUserThunk,
  logoutUserThunk,

  fetchUsersThunk,
  fetchItemsThunk,
  fetchCabinetsThunk
};
