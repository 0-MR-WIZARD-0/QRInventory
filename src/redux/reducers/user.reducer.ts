import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/User";

type InitialState = {
  userData: User | undefined;
  loading: boolean;
};

const initialState: InitialState = {
  userData: undefined,
  loading: true
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      return state;
    },
    clearUser: state => {
      state.userData = undefined;
      return state;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    }
  }
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
