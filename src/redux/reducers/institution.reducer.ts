import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Institution } from "types/Institution";

type InitialState = {
  institutionData: Institution[] | undefined;
  loading: boolean;
};

const initialState: InitialState = {
  institutionData: undefined,
  loading: true
};

const InstitutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    getInstitution: (state, action: PayloadAction<Institution[]>) => {
      state.institutionData = action.payload;
      return state
    },
  }
});

export const institutionActions = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
