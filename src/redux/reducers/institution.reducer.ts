import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Institution } from "types/Institution";

type InitialState = {
  institutionData: Institution[] | undefined;
};

const initialState: InitialState = {
  institutionData: undefined,
};

const InstitutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    updateInstitution: (state, action: PayloadAction<Institution[]>) => {
      state.institutionData = action.payload;
      return state;
    }
  }
});

export const institutionActions = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
