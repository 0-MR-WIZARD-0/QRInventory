import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { viewInstitutionsActions } from "redux/reducers/view.institutions.reducer";
import { viewItemsActions } from "redux/reducers/view.items.reducer";
import { viewUsersActions } from "redux/reducers/view.users.reducer";
import { RootState } from "redux/rootReducer";
import { BackendError } from "types/App";
import { Cabinet } from "types/Cabinet";
import { Item } from "types/Item";
import { User } from "types/User";

export enum RejectResponsesViews {
  usersError = "Произошла ошибка при загрузке пользователей",
  cabinetsError = "Произошла ошибка при загрузке кабинетов",
  itemsError = "Произошла ошибка при загрузке предметов"
}

export const fetchCabinetsThunk = createAsyncThunk<any, { page: number; perPage: number; new?: true }>(
  "views/cabinets",
  async (params, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const { page, perPage } = params;
      const res = await api
        .get<any, { data: { cabinets: Cabinet[] | BackendError } }>("/cabinet/all", {
          params: { take: perPage, skip: (page - 1) * perPage, institution: state.institution.id }
        })
        .then(res => res.data);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(RejectResponsesViews.cabinetsError);
    }
  }
);

// https://stackoverflow.com/questions/64793504/cannot-set-getstate-type-to-rootstate-in-createasyncthunk
export const fetchItemsThunk = createAsyncThunk<any, { page: number; perPage: number; new?: true }>(
  "views/items",
  async (params, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (params.new) dispatch(viewItemsActions.updateItems([]));
      const { page, perPage } = params;
      const res = await api
        .get<any, { data: { items: Item[] | BackendError } }>("/item/all", {
          params: { take: perPage, skip: params.new ? 0 : (page - 1) * perPage, institution: state.institution.id }
        })
        .then(res => res.data);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(RejectResponsesViews.itemsError);
    }
  }
);

export const fetchUsersThunk = createAsyncThunk<any, { page: number; perPage: number; new?: true }>(
  "views/users",
  async (params, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (params.new) dispatch(viewUsersActions.updateUsers([]));
      const { page, perPage } = params;
      const res = await api
        .get<any, { data: { users: User[] | BackendError } }>("/user/all", {
          params: { take: perPage, skip: (page - 1) * perPage, institution: state.institution.id }
        })
        .then(res => res.data);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(RejectResponsesViews.usersError);
    }
  }
);

export const fetchInstitutionsThunk = createAsyncThunk<any, { page: number; perPage: number; new?: true }>(
  "views/institutions",
  async (params, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      if (params.new) dispatch(viewInstitutionsActions.updateInstitutions([]));
      const { page, perPage } = params;
      const res = await api
        .get<any, { data: { users: User[] | BackendError } }>("/institution/all", {
          params: { take: perPage, skip: (page - 1) * perPage, institution: state.institution.id }
        })
        .then(res => res.data);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(RejectResponsesViews.usersError);
    }
  }
);
