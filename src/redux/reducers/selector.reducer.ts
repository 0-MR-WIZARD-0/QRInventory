import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Selector } from "types/Selector";

type InitialState = {
  valueSelector: Selector[] | undefined;
};

const initialState: InitialState = {
  valueSelector: undefined,
};

const SelectorSlice = createSlice({
  name: "selectorValue",
  initialState,
  reducers: {
    getSelectorValue: (state, action: PayloadAction<Selector[]>) => {
        state.valueSelector = action.payload;
        return state;
    }
  }
});

export const selectorActions = SelectorSlice.actions;
export default SelectorSlice.reducer;
