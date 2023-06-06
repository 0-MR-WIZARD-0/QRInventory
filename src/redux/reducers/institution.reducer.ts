import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk, loginUserThunk, logoutUserThunk } from "redux/actions/auth.actions";
import { createInstitutionThunk } from "redux/actions/institutions.actions";
import { FulfilledAction, RejectedAction } from "types/Redux";
import { Roles, User } from "types/User";

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
    builder.addCase(createInstitutionThunk.fulfilled, (state, action) => {
      return { ...state, id: action.payload.id, name: action.payload.name };
    });
    builder.addMatcher(
      (action: FulfilledAction) => [fetchUserThunk.fulfilled.toString(), loginUserThunk.fulfilled.toString()].indexOf(action.type) > -1,
      (state, action: { type: string; payload: User | undefined }) => {
        if (!action.payload) return state;
        const institution = action.payload.role === Roles.admin ? action.payload.institutions[0] : action.payload.teacherInstitution;
        if (institution) return { ...state, id: institution.id, name: institution.name };
        else return state;
      }
    );
    builder.addMatcher(
      (action: RejectedAction) =>
        [
          logoutUserThunk.rejected.toString(),
          logoutUserThunk.fulfilled.toString(),
          fetchUserThunk.rejected.toString(),
          loginUserThunk.rejected.toString()
        ].indexOf(action.type) > -1,
      (state, action) => ({ id: null, name: null })
    );
  }
});

export const institutionActions = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
