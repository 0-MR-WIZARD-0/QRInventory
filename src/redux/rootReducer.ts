import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import cabinetReducer from "./reducers/cabinet.reducer";
import institutionReducer from "./reducers/institution.reducer";
import instReducer from "./reducers/selector.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cabinet: cabinetReducer,
  institution: institutionReducer,
  inst: instReducer
});

export type RootState = ReturnType<typeof rootReducer>;
