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
  initialState: initialState,
  reducers: {
    getInstitution: (state, action: PayloadAction<Institution[]>) => {
      state.institutionData = action.payload;
      return state
    },
    // updateInstitution: (state, action: PayloadAction<Institution[]>) => {
    //   state.institutionData = action.payload;
    //   return state;
    // },
    postInstitution: (state, action: PayloadAction<Institution[]>) => {
      state.institutionData?.push(...action.payload)
      return state;
    },
    removeInstitution: (state, action: PayloadAction<Institution[]>) => {

    }
  }
});

export const institutionActions = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
