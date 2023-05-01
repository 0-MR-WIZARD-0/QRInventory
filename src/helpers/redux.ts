import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/rootReducer";
import { userActions } from "redux/reducers/user.reducer";
import { institutionActions } from "redux/reducers/institution.reducer";
import { cabinetActions } from "redux/reducers/cabinet.reducer";
import { itemActions } from "redux/reducers/item.reducer";

const ActionCreators = {
  ...userActions,
  ...institutionActions,
  ...cabinetActions,
  ...itemActions
}; 

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
