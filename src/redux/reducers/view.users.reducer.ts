import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { fetchUsersThunk } from "redux/actions/views.main.actions";
import { User } from "types/User";
import { institutionActions } from "./institution.reducer";

type InitialState = {
  data: User[] | undefined;
  loading: boolean;
  maxElements: number;
};

const initialState: InitialState = {
  data: undefined,
  loading: true,
  maxElements: -1
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
      return { loading: false, data: state.data ? [...state.data, ...action.payload.users].filter(onlyUnique) : action.payload.users, maxElements: action.payload.total };
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(institutionActions.setInstitution, (state, action) => {
      return { ...state, data: [], maxElements: -1 };
    });
  }
});

export const viewUsersActions = ViewUsersSlice.actions;
export default ViewUsersSlice.reducer;
