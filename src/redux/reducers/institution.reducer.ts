import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk, loginUserThunk } from "redux/actions/user.actions";
import { FulfilledAction } from "types/Redux";

type StateInsitution = { id: string | null; name: string | null };

const initialState: StateInsitution = {
  id: null,
  name: null
};

const InstitutionSlice = createSlice({
  name: "institution",
  initialState: initialState,
  reducers: {
    setInstitution: (state, action: PayloadAction<StateInsitution | undefined>) => {
      return action.payload ? { id: action.payload.id, name: action.payload.name } : state;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      (action: FulfilledAction) => [fetchUserThunk.fulfilled.toString(), loginUserThunk.fulfilled.toString()].indexOf(action.type) > -1,
      (state, action) => {
        const institution = action.payload?.institutions[0];
        if (institution) return { ...state, id: institution.id, name: institution.name };
        else return state;
      }
    );
  }
});

export const institutionActions = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
