import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActionCreators, RootState } from "redux/rootReducer";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const onlyUnique = (v: { id: string }, i: number, a: any[]) => a.findIndex(v2 => v2.id === v.id) === i;
