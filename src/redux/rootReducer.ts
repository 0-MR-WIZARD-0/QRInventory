import { combineReducers } from "@reduxjs/toolkit";
import { cabinetApiSlice } from "./queries/cabinets.queries";
import userReducer from "./reducers/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  [cabinetApiSlice.reducerPath]: cabinetApiSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
