import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { fetchUsersThunk } from "redux/actions/views.main.actions";
import { User } from "types/User";

type InitialState = {
  data: User[];
  loading: boolean;
};

const initialState: InitialState = {
  data: [],
  loading: true
};

const ViewUsersSlice = createSlice({
  name: "view.users",
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsersThunk.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, ...action.payload].filter(onlyUnique) : action.payload };
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      return { ...state, loading: false };
    });
  }
});

export const viewUsersActions = ViewUsersSlice.actions;
export default ViewUsersSlice.reducer;
