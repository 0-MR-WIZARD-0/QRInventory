import { createSlice } from "@reduxjs/toolkit";
import { User } from "types/User";

type InitialState = {
  teachersData: User[];
  loading: boolean;
};

const initialState: InitialState = {
  teachersData: [],
  loading: true
};

const TeachersSlice = createSlice({
  name: "item",
  initialState,
  reducers: {}
});

export const teachersActions = TeachersSlice.actions;
export default TeachersSlice.reducer;
