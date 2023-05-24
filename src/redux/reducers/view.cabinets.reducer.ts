import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { createCabinetThunk } from "redux/actions/cabinets.actions";
import { fetchCabinetsThunk } from "redux/actions/views.main.actions";
import { Cabinet } from "types/Cabinet";
import { institutionActions } from "./institution.reducer";

type InitialState = {
  data: Cabinet[] | undefined;
  loading: boolean;
  maxElements: number;
};

const initialState: InitialState = {
  data: undefined,
  loading: true,
  maxElements: -1
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
    builder.addCase(createCabinetThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, action.payload].filter(onlyUnique) : [action.payload], maxElements: state.maxElements + 1 };
    });
    builder.addCase(fetchCabinetsThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, ...action.payload.cabinets].filter(onlyUnique) : action.payload.cabinets, maxElements: action.payload.total };
    });
    builder.addCase(fetchCabinetsThunk.rejected, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(institutionActions.setInstitution, (state, action) => {
      return { ...state, data: [], maxElements: -1 };
    });
  }
});

export const viewCabinetsActions = ViewCabinetsSlice.actions;
export default ViewCabinetsSlice.reducer;
