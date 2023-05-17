import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import cabinetReducer from "./reducers/cabinet.reducer";
import institutionReducer from "./reducers/institution.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cabinet: cabinetReducer,
  institution: institutionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
