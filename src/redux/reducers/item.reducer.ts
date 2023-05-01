import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "types/Item";

type InitialState = {
  itemData: Item[] | undefined;
};

const initialState: InitialState = {
  itemData: undefined,
};

const ItemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    updateItem: (state, action: PayloadAction<Item[]>) => {
      state.itemData = action.payload;
      return state;
    }
  }
});

export const itemActions = ItemSlice.actions;
export default ItemSlice.reducer;
