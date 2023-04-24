import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./queries/auth.queries";
import { cabinetApiSlice } from "./queries/cabinets.queries";
import { userApiSlice } from "./queries/user.queries";
import { rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([cabinetApiSlice.middleware, userApiSlice.middleware, authApiSlice.middleware])
});

export default store;
