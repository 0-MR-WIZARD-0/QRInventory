import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { fetchCabinetsThunk } from "redux/actions/views.main.actions";
import { Cabinet } from "types/Cabinet";
import { FulfilledAction, PendingAction, RejectedAction } from "types/Redux";

type InitialState = {
  data: Cabinet[] | undefined;
  loading: boolean;
};

const initialState: InitialState = {
  data: undefined,
  loading: true
};

const ViewCabinetsSlice = createSlice({
  name: "cabinet",
  initialState,
  reducers: {
    updateCabinets: (state, action: PayloadAction<Cabinet[]>) => {
      state.data = action.payload;
      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCabinetsThunk.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchCabinetsThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, ...action.payload].filter(onlyUnique) : action.payload };
    });
    builder.addCase(fetchCabinetsThunk.rejected, (state, action) => {
      return { ...state, loading: false };
    });
  }
});

export const viewCabinetsActions = ViewCabinetsSlice.actions;
export default ViewCabinetsSlice.reducer;
