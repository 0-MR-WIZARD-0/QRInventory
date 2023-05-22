import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { fetchItemsThunk } from "redux/actions/views.main.actions";
import { Item } from "types/Item";
import { institutionActions } from "./institution.reducer";

type InitialState = {
  data: Item[] | undefined;
  loading: boolean;
  maxElements: number;
};

const initialState: InitialState = {
  data: undefined,
  loading: true,
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
      return { ...state, loading: true };
    });
    builder.addCase(fetchItemsThunk.fulfilled, (state, action) => {
      return { loading: false, data: state.data ? [...state.data, ...action.payload.items].filter(onlyUnique) : action.payload.items, maxElements: action.payload.total };
    });
    builder.addCase(fetchItemsThunk.rejected, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(institutionActions.setInstitution, (state, action) => {
      return { ...state, data: [] };
    });
  }
});

export const viewItemsActions = ViewItemsSlice.actions;
export default ViewItemsSlice.reducer;
