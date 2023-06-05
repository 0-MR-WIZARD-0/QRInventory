import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchUserThunk, loginUserThunk, logoutUserThunk, validatePasswordThunk } from "./actions/auth.actions";
import { createUserThunk, deleteUserThunk, editUserThunk, fetchUserIdThunk } from "./actions/users.actions";
import { rootReducer } from "./rootReducer";
import { createCabinetThunk, deleteCabinetThunk, editCabinetThunk, fetchCabinetThunk } from "./actions/cabinets.actions";
import { createItemThunk, deleteItemThunk, editItemThunk, fetchItemThunk } from "./actions/items.actions";
import { createInstitutionThunk } from "./actions/institutions.actions";
import { fetchUsersThunk } from "./actions/views.main.actions";
import { fetchCabinetsThunk } from "./actions/views.main.actions";
import { fetchItemsThunk } from "./actions/views.main.actions";
import { fetchInstitutionsThunk } from "./actions/views.main.actions";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          //auth
          fetchUserThunk.fulfilled.toString(),
          fetchUserThunk.rejected.toString(),
          loginUserThunk.fulfilled.toString(),
          loginUserThunk.rejected.toString(),
          logoutUserThunk.rejected.toString(),
          logoutUserThunk.fulfilled.toString(),
          validatePasswordThunk.fulfilled.toString(),
          validatePasswordThunk.rejected.toString(),

          //users
          createUserThunk.fulfilled.toString(),
          createUserThunk.rejected.toString(),
          fetchUserIdThunk.fulfilled.toString(),
          fetchUserIdThunk.rejected.toString(),
          editUserThunk.fulfilled.toString(),
          editUserThunk.rejected.toString(),
          deleteUserThunk.fulfilled.toString(),
          deleteUserThunk.rejected.toString(),

          //cabinets
          createCabinetThunk.fulfilled.toString(),
          createCabinetThunk.rejected.toString(),
          fetchCabinetThunk.fulfilled.toString(),
          fetchCabinetThunk.rejected.toString(),
          editCabinetThunk.fulfilled.toString(),
          editCabinetThunk.rejected.toString(),
          deleteCabinetThunk.fulfilled.toString(),
          deleteCabinetThunk.rejected.toString(),

          //items
          createItemThunk.fulfilled.toString(),
          createItemThunk.rejected.toString(),
          fetchItemThunk.fulfilled.toString(),
          fetchItemThunk.rejected.toString(),
          editItemThunk.fulfilled.toString(),
          editItemThunk.rejected.toString(),
          deleteItemThunk.fulfilled.toString(),
          deleteItemThunk.rejected.toString(),

          //institutions
          createInstitutionThunk.fulfilled.toString(),
          createInstitutionThunk.rejected.toString(),

          //views
          fetchCabinetsThunk.fulfilled.toString(),
          fetchCabinetsThunk.rejected.toString(),
          fetchItemsThunk.fulfilled.toString(),
          fetchItemsThunk.rejected.toString(),
          fetchUsersThunk.fulfilled.toString(),
          fetchUsersThunk.rejected.toString(),
          fetchInstitutionsThunk.fulfilled.toString(),
          fetchInstitutionsThunk.rejected.toString()
        ]
      }
    })
});

export default store;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
