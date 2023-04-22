import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/rootReducer";
import { userActions } from "redux/reducers/user.reducer";

const ActionCreators = {
  ...userActions
};

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
