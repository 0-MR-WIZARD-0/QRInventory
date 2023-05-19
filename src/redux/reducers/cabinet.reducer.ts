import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCabinetsThunk } from "redux/actions/cabinets.actions";
import { Cabinet } from "types/Cabinet";
import { FulfilledAction, PendingAction, RejectedAction } from "types/Redux";

type InitialState = {
  cabinetData: Cabinet[] | undefined;
  loading: boolean;
};

const initialState: InitialState = {
  cabinetData: undefined,
  loading: true
};

const CabinetSlice = createSlice({
  name: "cabinet",
  initialState,
  reducers: {
    updateCabinets: (state, action: PayloadAction<Cabinet[]>) => {
      state.cabinetData = action.payload;
      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(getCabinetsThunk.pending.toString(), (state, action: PendingAction) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCabinetsThunk.rejected.toString(), (state, action: RejectedAction) => {
      return { ...state, loading: false };
    });
    builder.addCase(getCabinetsThunk.fulfilled.toString(), (state, action: FulfilledAction) => {
      return { cabinetData: action.payload as Cabinet[], loading: false };
    });
  }
});

export const cabinetActions = CabinetSlice.actions;
export default CabinetSlice.reducer;
