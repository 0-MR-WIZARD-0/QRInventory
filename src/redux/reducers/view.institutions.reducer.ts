import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { createInstitutionThunk } from "redux/actions/institutions.actions";
import { fetchInstitutionsThunk } from "redux/actions/views.main.actions";
import { Institution } from "types/Institution";

type InitialState = {
  data: Institution[] | undefined;
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

const ViewInstitutionsSlice = createSlice({
  name: "view.institutions",
  initialState,
  reducers: {
    updateInstitutions: (state, action: PayloadAction<Institution[]>) => {
      state.data = action.payload;
      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchInstitutionsThunk.pending, (state, action) => {
      return { ...state, loading: true, error: undefined };
    });
    builder.addCase(createInstitutionThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, action.payload].filter(onlyUnique) : [action.payload], maxElements: state.maxElements + 1, error: undefined };
    });
    builder.addCase(fetchInstitutionsThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, ...action.payload.institutions].filter(onlyUnique) : action.payload.institutions, maxElements: action.payload.total, error: undefined };
    });
    builder.addCase(fetchInstitutionsThunk.rejected, (state, action) => {
      return { ...state, loading: false, error: (action.payload as { payload: string }).payload ?? "Произошла ошибка при загрузке учреждений" };
    });
  }
});

export const viewInstitutionsActions = ViewInstitutionsSlice.actions;
export default ViewInstitutionsSlice.reducer;
