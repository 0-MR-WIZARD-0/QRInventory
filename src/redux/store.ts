import { configureStore } from "@reduxjs/toolkit";
import { cabinetApiSlice } from "./queries/cabinets.queries";
import { rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cabinetApiSlice.middleware)
});

export default store;
