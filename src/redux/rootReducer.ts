import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "./queries/auth.queries";
import { userApiSlice } from "./queries/user.queries";
import userReducer from "./reducers/user.reducer";
import cabinetReducer from "./reducers/cabinet.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cabinet: cabinetReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
