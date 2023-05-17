import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import cabinetReducer from "./reducers/cabinet.reducer";
import institutionReducer from "./reducers/institution.reducer";
import selectorReducer from "./reducers/selector.reducer";
import itemReducer from "./reducers/item.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cabinet: cabinetReducer,
  institution: institutionReducer,
  selector: selectorReducer,
  item: itemReducer
});

export type RootState = ReturnType<typeof rootReducer>;
