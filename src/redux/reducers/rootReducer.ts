import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
// import canvasReducer from "./canvas.reducer";

export const rootReducer = combineReducers({
  //   canvas: canvasReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
