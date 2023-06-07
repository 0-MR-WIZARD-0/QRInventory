import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlyUnique } from "helpers/redux";
import { createItemThunk, deleteItemThunk, editItemThunk, searchItemThunk } from "redux/actions/items.actions";
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
    builder.addCase(createItemThunk.fulfilled, (state, action) => {
      return {
        loading: false,
        data: state.data ? [...state.data, action.payload].filter(onlyUnique) : [action.payload],
        maxElements: state.maxElements + 1,
        error: undefined
      };
    });
    builder.addCase(fetchItemsThunk.fulfilled, (state, action) => {
      return {
        loading: false,
        data: state.data ? [...state.data, ...action.payload.items].filter(onlyUnique) : action.payload.items,
        maxElements: action.payload.total,
        error: undefined
      };
    });
    builder.addCase(fetchItemsThunk.rejected, (state, action) => {
      return { ...state, loading: false, error: (action.payload as { payload: string }).payload ?? "Произошла ошибка при загрузке предметов" };
    });
    builder.addCase(institutionActions.setInstitution, (state, action) => {
      return { ...state, data: undefined, maxElements: -1 };
    });
    builder.addCase(deleteItemThunk.fulfilled, (state, action) => {
      return { ...state, data: state.data?.filter(c => c.id !== action.meta.arg.id), error: undefined };
    });
    builder.addCase(editItemThunk.fulfilled, (state, action) => {
      return { ...state, data: state.data?.filter(c => c.id !== action.meta.arg.id), error: undefined };
    });

    builder.addCase(searchItemThunk.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        const newItems = [
          ...action.payload,
          ...(state.data ? state.data?.filter(di => !(action.payload as Item[]).some(pi => pi.id === di.id)) : [])
        ];
        return { ...state, data: newItems, loading: false };
      } else {
        return { ...state, data: [...(state.data?.filter(di => di.id !== (action.payload as Item).id) ?? []), action.payload] };
      }
    });
  }
});

export const viewItemsActions = ViewItemsSlice.actions;
export default ViewItemsSlice.reducer;
