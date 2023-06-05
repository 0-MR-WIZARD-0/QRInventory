import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { User } from "types/User";

export enum RejectResponsesUser {
  fetchUserError = "Произошла ошибка при получении пользователя",
  fetchUsersError = "Произошла ошибка при получении пользователей",
  createUserError = "Произошла ошибка при создании пользователя",
  editUserError = "Произошла ошибка при изменении пользователя",
  deleteUserError = "Произошла ошибка при удалении пользователя"
}

export const createUserThunk = createAsyncThunk<any, { fullName: string; email: string; password: string; teacherInstitution: string }>(
  "user/create",
  async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
    const { email, fullName, password, teacherInstitution } = params;

    try {
      const res = await api.post<any, { data: User | BackendError | undefined }>("/user/create", { email, fullName, password, teacherInstitution });
      if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesUser.createUserError);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserIdThunk = createAsyncThunk<any, { id: string }>(
  "user/fetch",
  async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.get<any, { data: User | BackendError | undefined }>("/user/search", { params: { id: params.id } });
      if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesUser.fetchUserError);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editUserThunk = createAsyncThunk<any, { id: string; fullName: string; email: string; oldPassword?: string; newPassword?: string }>(
  "user/edit",
  async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.patch<any, { data: User | BackendError | undefined }>(`/user/edit?id=${params.id}`, { ...params });
      if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesUser.editUserError);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserThunk = createAsyncThunk<any, { id: string }>("user/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await api.delete<any, { data: User | BackendError | undefined }>(`/user/${params.id}`);
    if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesUser.deleteUserError);
    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const searchUserThunk = createAsyncThunk<User[], { institution: string; searchVal: string; take: number; skip: number; id?: string }>(
  "item/search",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.get<any, { data: { users: User[] } | BackendError | undefined }>(`/user/search`, {
        params: {
          fio: params.searchVal,
          email: params.searchVal,
          institution: params.institution,
          id: params.id,
          take: params.take,
          skip: params.skip
        }
      });
      if (!res || res.data === undefined) throw new Error((res.data as BackendError)?.description ?? RejectResponsesUser.fetchUsersError);
      // немного косячно с типами
      return fulfillWithValue((res.data as { users: User[] }).users);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
