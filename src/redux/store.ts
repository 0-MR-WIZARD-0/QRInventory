import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchUserThunk, loginUserThunk, logoutUserThunk } from "./actions/auth.actions";
import { rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          loginUserThunk.rejected.toString(),
          fetchUserThunk.rejected.toString(),
          logoutUserThunk.rejected.toString(),
          logoutUserThunk.fulfilled.toString()
        ]
      }
    })
});

export default store;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
