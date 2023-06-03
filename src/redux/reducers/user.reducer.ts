import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk, loginUserThunk, logoutUserThunk } from "redux/actions/auth.actions";
import { FulfilledAction, PendingAction, RejectedAction } from "types/Redux";
import { User } from "types/User";

type InitialState = {
  userData: User | undefined;
  loading: boolean;
  error?: string;
};

const initialState: InitialState = {
  userData: undefined,
  loading: true,
  error: undefined
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUsers: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      return state;
    },
    updateUser: (state, action: PayloadAction<User | undefined>) => {
      return { ...state, userData: action.payload, loading: false, error: undefined };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload, error: undefined };
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      return { ...state, error: action.payload, loading: false };
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      (action: FulfilledAction) =>
        [fetchUserThunk.fulfilled.toString(), loginUserThunk.fulfilled.toString()].indexOf(
          action.type
        ) > -1,
      (state, action) => {
        if (!action.payload)
          return {
            ...state,
            userData: undefined,
            loading: false,
            error: "Произошла ошибка при загрузке пользователя"
          };
        return { ...state, userData: action.payload, loading: false, error: undefined };
      }
    );

    builder.addMatcher(
      (action: RejectedAction) =>
        [
          fetchUserThunk.rejected.toString(),
          loginUserThunk.rejected.toString(),
          logoutUserThunk.rejected.toString(),
          logoutUserThunk.fulfilled.toString()
        ].indexOf(action.type) > -1,
      (state, action) => {
        return { ...state, userData: undefined, loading: false, error: action.payload as string };
      }
    );
    builder.addMatcher(
      (action: PendingAction) =>
        [
          fetchUserThunk.pending.toString(),
          loginUserThunk.pending.toString(),
          logoutUserThunk.pending.toString()
        ].indexOf(action.type) > -1,
      (state, action) => {
        return { ...state, loading: true };
      }
    );
  }
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
