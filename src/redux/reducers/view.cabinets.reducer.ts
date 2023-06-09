import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { logoutUserThunk } from "redux/actions/auth.actions";
import { createCabinetThunk, deleteCabinetThunk, editCabinetThunk } from "redux/actions/cabinets.actions";
import { fetchCabinetsThunk } from "redux/actions/views.main.actions";
import { Cabinet } from "types/Cabinet";
import { institutionActions } from "./institution.reducer";

type InitialState = {
  data: Cabinet[] | undefined;
  loading: boolean;
  error: string | undefined;
  maxElements: number;
};

const initialState: InitialState = {
  data: undefined,
  loading: true,
  error: undefined,
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
      return { ...state, loading: true, error: undefined };
    });
    builder.addCase(createCabinetThunk.fulfilled, (state, action) => {
      return {
        loading: false,
        data: state.data ? [...state.data, action.payload].filter(onlyUnique) : [action.payload],
        maxElements: state.maxElements + 1,
        error: undefined
      };
    });
    builder.addCase(fetchCabinetsThunk.fulfilled, (state, action) => {
      return {
        loading: false,
        data: state.data ? [...state.data, ...action.payload.cabinets].filter(onlyUnique) : action.payload.cabinets,
        maxElements: action.payload.total,
        error: undefined
      };
    });
    builder.addCase(fetchCabinetsThunk.rejected, (state, action) => {
      return { ...state, loading: false, error: (action.payload as { payload: string }).payload ?? "Произошла ошибка при загрузке кабинетов" };
    });
    builder.addCase(institutionActions.setInstitution, (state, action) => {
      return { ...state, data: undefined, maxElements: -1 };
    });
    builder.addCase(deleteCabinetThunk.fulfilled, (state, action) => {
      return { ...state, data: state.data?.filter(c => c.id !== action.meta.arg.id), error: undefined };
    });
    builder.addCase(editCabinetThunk.fulfilled, (state, action) => {
      return { ...state, data: undefined, loading: true, error: undefined };
    });

    builder.addCase(logoutUserThunk.pending, (state, action) => {
      return { ...state, data: undefined, loading: true, error: undefined };
    });
  }
});

export const viewCabinetsActions = ViewCabinetsSlice.actions;
export default ViewCabinetsSlice.reducer;
