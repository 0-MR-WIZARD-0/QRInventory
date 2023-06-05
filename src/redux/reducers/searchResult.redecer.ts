import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "types/Item";
import { Teacher } from "types/Teacher";

type InitialState = {
    searchResults: Item[] | Teacher[];
  };

const initialState: InitialState = {
    searchResults: [],
};
  
const searchSlice = createSlice({
    name: 'droplist',
    initialState,
    reducers: {
      setSearchResults: (state, action: PayloadAction<Item[] | Teacher[]>) => {
        state.searchResults = action.payload;
      },
    },
});


export const SearchActions = searchSlice.actions;
export default searchSlice.reducer;