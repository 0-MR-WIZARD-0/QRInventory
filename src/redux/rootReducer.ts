import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "./queries/auth.queries";
import { cabinetApiSlice } from "./queries/cabinets.queries";
import { userApiSlice } from "./queries/user.queries";
import userReducer from "./reducers/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  [cabinetApiSlice.reducerPath]: cabinetApiSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
