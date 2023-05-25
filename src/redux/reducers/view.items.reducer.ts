import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { fetchItemsThunk } from "redux/actions/views.main.actions";
import { Item } from "types/Item";
import { institutionActions } from "./institution.reducer";

type InitialState = {
  data: Item[] | undefined;
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

const ViewItemsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    updateItems: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
      return state;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchItemsThunk.pending, (state, action) => {
      return { ...state, loading: true, error: undefined };
    });
    builder.addCase(fetchItemsThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, ...action.payload.items].filter(onlyUnique) : action.payload.items, maxElements: action.payload.total, error: undefined };
    });
    builder.addCase(fetchItemsThunk.rejected, (state, action) => {
      return { ...state, loading: false, error: (action.payload as { payload: string }).payload ?? "Произошла ошибка при загрузке предметов" };
    });
    builder.addCase(institutionActions.setInstitution, (state, action) => {
      return { ...state, data: [], maxElements: -1 };
    });
  }
});

export const viewItemsActions = ViewItemsSlice.actions;
export default ViewItemsSlice.reducer;
