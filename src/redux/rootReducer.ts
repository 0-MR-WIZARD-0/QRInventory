import { combineReducers } from "@reduxjs/toolkit";
import userReducer, { userActions } from "./reducers/user.reducer";
import cabinetReducer, { cabinetActions } from "./reducers/cabinet.reducer";
import institutionReducer, { institutionActions } from "./reducers/institution.reducer";
import { fetchUserThunk, loginUserThunk, logoutUserThunk } from "./actions/user.actions";
import itemReducer, { itemActions } from "./reducers/item.reducer";
import teachersReducer, { teachersActions } from "./reducers/teachers.reducer";
import { getCabinetsThunk } from "./actions/cabinets.actions";

export const rootReducer = combineReducers({
  user: userReducer,
  cabinet: cabinetReducer,
  item: itemReducer,
  teachers: teachersReducer,
  institution: institutionReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const ActionCreators = {
  ...userActions,
  ...institutionActions,
  ...cabinetActions,
  ...itemActions,
  ...teachersActions,
  fetchUserThunk,
  loginUserThunk,
  logoutUserThunk,

  getCabinetsThunk
};
