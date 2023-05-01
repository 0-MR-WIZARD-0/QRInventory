import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import institutionReducer from "./institution.reducer";
import cabinetReducer from "./cabinet.reducer";
import itemReducer from "./item.reducer";
// import canvasReducer from "./canvas.reducer";

export const rootReducer = combineReducers({
  //   canvas: canvasReducer,
  user: userReducer,
  institution: institutionReducer,
  cabinet: cabinetReducer,
  item: itemReducer
});

export type RootState = ReturnType<typeof rootReducer>;
