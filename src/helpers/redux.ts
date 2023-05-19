import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActionCreators, RootState } from "redux/rootReducer";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
