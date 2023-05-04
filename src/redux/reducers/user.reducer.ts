import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    updateUser: (state, action: PayloadAction<User | undefined>) => {
      state.userData = action.payload;
      return state;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
      return state;
    }
  }
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
