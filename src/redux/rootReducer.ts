import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import cabinetReducer from "./reducers/cabinet.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cabinet: cabinetReducer
});

export type RootState = ReturnType<typeof rootReducer>;
