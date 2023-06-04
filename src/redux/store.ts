import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchUserThunk, loginUserThunk, logoutUserThunk, validatePasswordThunk } from "./actions/auth.actions";
import { fetchUserIdThunk } from "./actions/users.actions";
import { rootReducer } from "./rootReducer";
import { createCabinetThunk, fetchCabinetThunk } from "./actions/cabinets.actions";
import { createItemThunk } from "./actions/items.actions";
import { createInstitutionThunk } from "./actions/institutions.actions";
import { fetchUsersThunk } from "./actions/views.main.actions";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          loginUserThunk.fulfilled.toString(),
          loginUserThunk.rejected.toString(),
          fetchUserThunk.fulfilled.toString(),
          fetchUserThunk.rejected.toString(),
          fetchUserIdThunk.fulfilled.toString(),
          fetchUserIdThunk.rejected.toString(),
          fetchUsersThunk.fulfilled.toString(),
          fetchUsersThunk.rejected.toString(),
          logoutUserThunk.rejected.toString(),
          logoutUserThunk.fulfilled.toString(),
          validatePasswordThunk.fulfilled.toString(),
          validatePasswordThunk.rejected.toString(),
          createCabinetThunk.fulfilled.toString(),
          createCabinetThunk.rejected.toString(),
          createItemThunk.fulfilled.toString(),
          createItemThunk.rejected.toString(),
          createInstitutionThunk.fulfilled.toString(),
          createInstitutionThunk.rejected.toString()
        ]
      }
    })
});

export default store;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
